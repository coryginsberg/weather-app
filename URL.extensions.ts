type LatLong = {
  latitiude: string,
  longitude: string,
}

export default class URI extends URL {
  constructor(url: string | URL, base?: string | URL) {
    super(url, base);
  }

  addSearchParams(url: URL, params: LatLong): URL {
    return new URL(
      `${url.origin}${url.pathname}?${new URLSearchParams([
        ...Array.from(url.searchParams.entries()),
        ...Object.entries<string>(params),
      ])}`
    );
  }
}
  
