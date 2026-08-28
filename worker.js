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

    return env.ASSETS.fetch(request);
  },
};
