export const observerIsIntersecting = (target, callback) => {
  if (IntersectionObserver) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.disconnect();
        }
      })
    });

    io.observe(target);
  };
};
