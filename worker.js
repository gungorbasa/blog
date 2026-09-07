// Keep generated first-page aliases and malformed paths exposed by an earlier
// output-normalization bug as server-side redirects. This prevents duplicate
// 200 pages and preserves crawler/backlink access to the intended resources.
export const permanentRedirects = new Map([
  ["/page/1", "/"],
  ["/page/2", "/posts/page/2"],
  ["/posts/page/1", "/posts"],
  ["/tags/artificial-intelligence/page/1", "/tags/artificial-intelligence"],
  ["/tags/c++/page/1", "/tags/c++"],
  ["/tags/ios/page/1", "/tags/ios"],
  ["/tags/privacy/page/1", "/tags/privacy"],
  ["/tags/python/page/1", "/tags/python"],
  ["/tags/swift/page/1", "/tags/swift"],
  ["/tags/vim/page/1", "/tags/vim"],
  ["/categoriesindex.xml", "/categories/index.xml"],
  ["/postsindex.xml", "/posts/index.xml"],
  ["/tagsindex.xml", "/tags/index.xml"],
  ["/tagsartificial-intelligence", "/tags/artificial-intelligence"],
  ["/tagsartificial-intelligenceindex.xml", "/tags/artificial-intelligence/index.xml"],
  ["/tagsc++", "/tags/c++"],
  ["/tagsc++index.xml", "/tags/c++/index.xml"],
  ["/tagsios", "/tags/ios"],
  ["/tagsiosindex.xml", "/tags/ios/index.xml"],
  ["/tagsprivacy", "/tags/privacy"],
  ["/tagsprivacyindex.xml", "/tags/privacy/index.xml"],
  ["/tagspython", "/tags/python"],
  ["/tagspythonindex.xml", "/tags/python/index.xml"],
  ["/tagsswift", "/tags/swift"],
  ["/tagsswiftindex.xml", "/tags/swift/index.xml"],
  ["/tagsvim", "/tags/vim"],
  ["/tagsvimindex.xml", "/tags/vim/index.xml"],
]);

export default {
  fetch(request, env) {
    const url = new URL(request.url);

    if (url.protocol !== "https:") {
      url.protocol = "https:";
      if (url.hostname === "www.gungorbasa.com") {
        url.hostname = "gungorbasa.com";
      }
      return Response.redirect(url.toString(), 301);
    }

    if (url.hostname === "www.gungorbasa.com") {
      url.hostname = "gungorbasa.com";
      return Response.redirect(url.toString(), 301);
    }

    const redirectPath = permanentRedirects.get(url.pathname);
    if (redirectPath) {
      url.pathname = redirectPath;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
