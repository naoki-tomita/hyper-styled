(global as any).document = {};
Object.defineProperty(document, "body", {
  value: {
    appendChild(el: any) {
      console.log(el);
    }
  }
});
Object.defineProperty(document, "createElement", {
  value(name: string) {
    return {
      name,
      set innerHTML(html: string) { console.log(html) }
    };
  }
});
