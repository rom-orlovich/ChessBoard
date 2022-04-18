// return createEl(`<table><tbody> // <tr> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // </tr> // <tr> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // </tr> // <tr> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // </tr> // <tr> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // </tr> // <tr> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // </tr> // <tr> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // </tr> // <tr> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // </tr> // <tr> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // <td></td> // </tr> // </tbody></table>`);

    // this.boardDir === 2
    //   ? this.parentEl?.classList.add("rotate180")
    //   : this.parentEl?.classList.remove("rotate180");
    // console.log(boardDir);
    // console.log(boardDir);
    this.makeTDArr();
    this.tdBoardChess.forEach((el) => {
      const img = el?.firstElementChild;
      if (!img) return;
      boardDir === 2
        ? img.classList.add("rotate180Img")
        : img.classList.remove("rotate180Img");
    });
