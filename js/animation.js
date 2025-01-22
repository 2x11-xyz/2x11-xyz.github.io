class GridAnimation {
  constructor() {
    this.container = document.getElementById("grid-container");
    this.dots = [];
    this.currentSequenceIndex = 0;
    this.sequences = Object.values(sequences);
    this.animationRunning = false;

    // Bind the resize handler
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener("resize", this.handleResize);

    this.init();
  }

  handleResize() {
    // Update dots positions without resetting the sequence
    this.updateDotPositions();
  }

  init() {
    // Clear existing content
    this.container.innerHTML = "";
    this.dots = [];

    // Grid settings
    if (window.innerWidth <= 768) {
      this.ROWS = 5;
      this.COLS = 5;
    } else {
      this.ROWS = 10;
      this.COLS = 10;
    }
    this.PADDING = 40;

    // Create dots
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        const dot = document.createElement("div");
        dot.className = "dot";

        this.container.appendChild(dot);
        this.dots.push(dot);
      }
    }

    // Position the dots
    this.updateDotPositions();

    if (this.dots.length === this.ROWS * this.COLS && !this.animationRunning) {
      this.startAnimation();
    }
  }

  updateDotPositions() {
    // Grid settings
    const PADDING = this.PADDING;

    // Get container dimensions
    const containerRect = this.container.getBoundingClientRect();
    const availableWidth = containerRect.width - PADDING * 2;
    const availableHeight = containerRect.height - PADDING * 2;

    // Calculate spacing
    const spacingX = availableWidth / (this.COLS - 1);
    const spacingY = availableHeight / (this.ROWS - 1);

    // Update positions of existing dots
    let index = 0;
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        const x = PADDING + col * spacingX;
        const y = PADDING + row * spacingY;

        const dot = this.dots[index];
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;

        index++;
      }
    }
  }

  async startAnimation() {
    if (this.animationRunning) return;
    this.animationRunning = true;

    while (this.animationRunning) {
      for (const sequence of this.sequences) {
        if (!this.animationRunning) break;
        await this.animateSequence(sequence);
        if (!this.animationRunning) break;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }

  async animateSequence(sequence) {
    if (!this.animationRunning) return;
    const numbers = sequence.generate();

    for (const num of numbers) {
      if (!this.animationRunning) return;
      if (Array.isArray(num)) {
        await this.highlightDots(num);
      } else {
        await this.highlightDot(num);
      }
      if (!this.animationRunning) return;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (this.animationRunning) {
      this.dots.forEach((dot) => dot.classList.remove("active"));
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  async highlightDot(sequenceNumber) {
    const index = sequenceNumber - 1;
    if (this.dots[index] && this.animationRunning) {
      this.dots[index].classList.add("active");
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  async highlightDots(indices) {
    if (this.animationRunning) {
      await Promise.all(indices.map((index) => this.highlightDot(index)));
    }
  }
}

// Initialize the animation when the window loads
window.addEventListener("load", () => {
  new GridAnimation();
});
