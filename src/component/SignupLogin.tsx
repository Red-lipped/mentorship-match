import React, { JSX, useEffect } from "react";
import paper from "paper";

const SignupLogin: React.FC = (): JSX.Element => {
  useEffect(() => {
    // Toggle Between Sign Up / Login
    const goRight = document.getElementById("goRight") as HTMLElement;
    const goLeft = document.getElementById("goLeft") as HTMLElement;
    const slideBox = document.getElementById("slideBox") as HTMLElement;
    const topLayer = document.querySelector(".topLayer") as HTMLElement;

    if (goRight) {
      goRight.addEventListener("click", () => {
        if (slideBox && topLayer) {
          slideBox.style.marginLeft = "0";
          topLayer.style.marginLeft = "100%";
        }
      });
    }

    if (goLeft) {
      goLeft.addEventListener("click", () => {
        if (slideBox && topLayer) {
          slideBox.style.marginLeft = window.innerWidth > 769 ? "50%" : "20%";
          topLayer.style.marginLeft = "0";
        }
      });
    }

    // Initialize Canvas with paper.js
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    paper.setup(canvas);
    const shapeGroup = new paper.Group();
    const positionArray: { x: number; y: number }[] = [];

    function getCanvasBounds() {
      const canvasWidth = paper.view.size.width;
      const canvasHeight = paper.view.size.height;
      const canvasMiddleX = canvasWidth / 2;
      const canvasMiddleY = canvasHeight / 2;

      positionArray.length = 0; // Clear the array before pushing new positions
      positionArray.push(
        { x: canvasMiddleX / 2 + 100, y: 100 },
        { x: 200, y: canvasMiddleY },
        { x: canvasMiddleX - 50 + canvasMiddleX / 2, y: 150 },
        { x: 0, y: canvasMiddleY + 100 },
        { x: canvasWidth - 130, y: canvasHeight - 75 },
        { x: canvasMiddleX + 80, y: canvasHeight - 50 },
        { x: canvasWidth + 60, y: canvasMiddleY - 50 },
        { x: canvasMiddleX + 100, y: canvasMiddleY + 100 }
      );
    }

    function initializeShapes() {
      getCanvasBounds();

      const shapePathData = [
        "M231,352l445-156L600,0L452,54L331,3L0,48L231,352",
        "M0,0l64,219L29,343l535,30L478,37l-133,4L0,0z",
        "M0,65l16,138l96,107l270-2L470,0L337,4L0,65z",
        "M333,0L0,94l64,219L29,437l570-151l-196-42L333,0",
        "M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z",
        "M389,352l92-113l195-43l0,0l0,0L445,48l-80,1L122.7,0L0,275.2L162,297L389,352",
        "M 50 100 L 300 150 L 550 50 L 750 300 L 500 250 L 300 450 L 50 100",
        "M 700 350 L 500 350 L 700 500 L 400 400 L 200 450 L 250 350 L 100 300 L 150 50 L 350 100 L 250 150 L 450 150 L 400 50 L 550 150 L 350 250 L 650 150 L 650 50 L 700 150 L 600 250 L 750 250 L 650 300 L 700 350 "
      ];

      shapePathData.forEach((data, i) => {
        const headerShape = new paper.Path({
          strokeColor: "rgba(255, 255, 255, 0.5)",
          strokeWidth: 2,
          parent: shapeGroup
        });
        headerShape.pathData = data;
        headerShape.scale(2);
        headerShape.position = positionArray[i];
      });
    }

    initializeShapes();

    paper.view.onFrame = (event: paper.IFrameEvent) => {
      if (event.count % 4 === 0) {
        shapeGroup.children.forEach((child, i) => {
          child.rotate(i % 2 === 0 ? -0.1 : 0.1);
        });
      }
    };

    paper.view.onResize = () => {
      getCanvasBounds();
      shapeGroup.children.forEach((child, i) => {
        child.position = positionArray[i];
        child.opacity = paper.view.size.width < 700 && [3, 2, 5].includes(i) ? 0 : 1;
      });
    };
  }, []);

  return (
    <>
      <div id="back">
        <canvas id="canvas" className="canvas-back"></canvas>
        <div className="backRight"></div>
        <div className="backLeft"></div>
      </div>

      <div id="slideBox">
        <div className="topLayer">
          <div className="left">
            <div className="content">
              <h2>Sign Up</h2>
              <form id="form-signup" method="post" onSubmit={(e) => e.preventDefault()}>
                <div className="form-element form-stack">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input id="email" type="email" name="email" />
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="username-signup" className="form-label">Username</label>
                  <input id="username-signup" type="text" name="username" />
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="password-signup" className="form-label">Password</label>
                  <input id="password-signup" type="password" name="password" />
                </div>
                <div className="form-element form-checkbox">
                  <input id="confirm-terms" type="checkbox" name="confirm" value="yes" className="checkbox" />
                  <label htmlFor="confirm-terms">
                    I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                  </label>
                </div>
                <div className="form-element form-submit">
                  <button id="signUp" className="signup" type="submit">Sign up</button>
                  <button id="goLeft" className="signup off">Log In</button>
                </div>
              </form>
            </div>
          </div>
          <div className="right">
            <div className="content">
              <h2>Login</h2>
              <form id="form-login" method="post" onSubmit={(e) => e.preventDefault()}>
                <div className="form-element form-stack">
                  <label htmlFor="username-login" className="form-label">Username</label>
                  <input id="username-login" type="text" name="username" />
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="password-login" className="form-label">Password</label>
                  <input id="password-login" type="password" name="password" />
                </div>
                <div className="form-element form-submit">
                  <button id="logIn" className="login" type="submit">Log In</button>
                  <button id="goRight" className="login off">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupLogin;
