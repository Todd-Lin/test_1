/**
 * Vanilla 3D Card Tilt Effect with Dynamic Glare
 */
class VanillaTilt {
  static init(elements, options = {}) {
    const config = {
      maxTilt: options.maxTilt || 12,
      perspective: options.perspective || 1000,
      scale: options.scale || 1.02,
      speed: options.speed || 400
    };

    elements.forEach((el) => {
      let bounds;

      const onMouseEnter = () => {
        bounds = el.getBoundingClientRect();
        el.style.transition = `transform 0.1s ease-out`;
      };

      const onMouseMove = (e) => {
        if (!bounds) bounds = el.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = (mouseX / bounds.width - 0.5) * 2;
        const yPct = (mouseY / bounds.height - 0.5) * 2;

        const tiltX = -yPct * config.maxTilt;
        const tiltY = xPct * config.maxTilt;

        el.style.transform = `perspective(${config.perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${config.scale}, ${config.scale}, ${config.scale})`;
      };

      const onMouseLeave = () => {
        el.style.transition = `transform ${config.speed}ms cubic-bezier(0.16, 1, 0.3, 1)`;
        el.style.transform = `perspective(${config.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      };

      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
    });
  }
}

window.VanillaTilt = VanillaTilt;
