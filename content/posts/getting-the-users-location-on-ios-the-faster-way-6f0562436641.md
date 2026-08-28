---
title: "Getting the User’s Location on iOS — The Faster Way"
description: "Recently at work, our product team raised concerns about how long it was taking to retrieve the user’s location. On our vast, magical world map, the process…"
date: "2024-09-10T19:46:50.378Z"
author: "Gungor Basa"
tags: ["Swift","iOS"]
originalUrl: "https://medium.com/@gbasa/getting-the-users-location-on-ios-the-faster-way-6f0562436641"
mediumId: "6f0562436641"
featureimage: "/images/posts/getting-the-users-location-on-ios-the-faster-way-6f0562436641/01-a710cf1a.jpg"
images: ["/images/posts/getting-the-users-location-on-ios-the-faster-way-6f0562436641/01-a710cf1a.jpg"]
---
**Recently at work, our product team raised concerns about how long it was taking to retrieve the user’s location. On our vast, magical world map, the process was dragging, and we were taking our sweet time to determine where users were.**

Curious, I started digging into the code. Everything seemed fine at first glance. We were using the `requestLocation()` method, which, according to the documentation, is designed to provide a single location fix and then stop. It seemed like the perfect choice since we only needed one precise location.

On the simulator, the method worked fast, so no red flags there. But when I tested it on a real device, things got weird — it was taking an **absurdly long time** to return the location. Naturally, this piqued my curiosity, and I decided to measure just how long it was actually taking. To do that, I created a simple test app.

Here’s the code for the test app:

```swift
import Foundation
import CoreLocation

final class ViewModel: NSObject, ObservableObject {
    private lazy var manager: CLLocationManager = {
        let manager = CLLocationManager()
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.delegate = self
        return manager
    }()
    
    @Published var location: CLLocation = .init()
    @Published var timePassed: Double = 0
    
    private var locationRequestTime: Double = 0
    
    func request() {
        manager.requestWhenInUseAuthorization()
    }
}

extension ViewModel: CLLocationManagerDelegate {
    public func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        switch status {
        case .authorizedAlways, .authorizedWhenInUse:
            locationRequestTime = CFAbsoluteTimeGetCurrent()
            manager.requestLocation()
            print("Authorized!")
        case .denied, .restricted:
            print("Denied!")
        case .notDetermined:
            manager.requestWhenInUseAuthorization()
        @unknown default:
            break
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.first else { return }
        timePassed = CFAbsoluteTimeGetCurrent() - locationRequestTime
        
        prettyPrint(location: location, tag: "Locations.first")
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: any Error) {
        print(error.localizedDescription)
    }
    
    private func prettyPrint(location: CLLocation, tag: String) {
        print("----------------------------------------")
        print("Tag: \(tag)")
        print("Vertical Accuracy: \(location.verticalAccuracy)")
        print("Horizontal Accuracy: \(location.horizontalAccuracy)")
        print("Speed Accuracy: \(location.speedAccuracy)")
        print("Course Accuracy: \(location.courseAccuracy)")
        print("----------------------------------------")
    }
}
```

```scss
import SwiftUI

struct ContentView: View {
    @StateObject var viewModel = ViewModel()
    
    var body: some View {
        VStack {
            Text("\(viewModel.timePassed)")
            Text("\(viewModel.location)")
            
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
        }
        .padding()
        .onAppear {
            viewModel.request()
        }
    }
}
```

**Based on what I saw, I could hardly believe my eyes.** It was taking around **10 seconds** on a real device to get the user’s location using the `requestLocation()` method.

![](/images/posts/getting-the-users-location-on-ios-the-faster-way-6f0562436641/02-4d413be1.png)

After seeing those results, I knew there had to be a better way. After some research, I decided to try a different approach: `**startUpdatingLocation()**`.

Unlike `requestLocation()`, which gives you a single location and then stops, `startUpdatingLocation()` continuously updates the location until you manually stop it. At first, this might sound like an overkill if you only need one location fix, but I was curious to see how it compared.

To mimic the behavior of `requestLocation()`, I planned to simply stop the location updates as soon as I got the first result. Here’s the code change for the new method:

```swift
func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    switch status {
    case .authorizedAlways, .authorizedWhenInUse:
        locationRequestTime = CFAbsoluteTimeGetCurrent()
        manager.startUpdatingLocation()
        print("Authorized!")
    case .denied, .restricted:
        print("Denied!")
    case .notDetermined:
        manager.requestWhenInUseAuthorization()
    @unknown default:
        break
    }
}

func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    guard let location = locations.first else { return }
    timePassed = CFAbsoluteTimeGetCurrent() - locationRequestTime
    
    prettyPrint(location: location, tag: "Locations.first")
    manager.stopUpdatingLocation()
}
```

When I ran the new code, my jaw practically dropped. The `startUpdatingLocation()` method was about **600 times faster** than our original approach! It returned the location almost instantly, which was a **huge** improvement over the 10-second delay we were seeing before.

![](/images/posts/getting-the-users-location-on-ios-the-faster-way-6f0562436641/03-c099c68d.png)

* * *

Here are the accuracy results for both methods.

```yaml
requestLocation:

Vertical Accuracy: 3.0
Horizontal Accuracy: 19.471317809500263
Speed Accuracy: -1.0
Course Accuracy: -1.0

startUpdatingLocation:

Vertical Accuracy: 3.0
Horizontal Accuracy: 19.63992458714842
Speed Accuracy: -1.0
Course Accuracy: -1.0
```

As you can see, the accuracy values are almost identical. So, not only is `startUpdatingLocation()` significantly faster, but it’s just as precise as `requestLocation()`.

* * *

### Wrapping It Up

In our quest to optimize location retrieval, we uncovered a significant performance boost by switching from `requestLocation()` to `startUpdatingLocation()`. Initially, `requestLocation()` took around 10 seconds on a real device, which was surprisingly slow. However, by using `startUpdatingLocation()` and stopping updates after receiving the first result, we achieved a staggering improvement without loosing accuracy—location updates became about **600 times faster**!
