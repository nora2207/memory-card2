window.onload = function(){
  function trace(t){
    console.log(t);
    }

    let divs = document.getElementById("wrapper").getElementsByTagName("div");
    for(let i = 0; i < divs.length; i++){
      divs[i].style.position = "absolute";
      divs[i].style.display = "block";
    }

    let popUpImage = document.getElementById("popUpImage");
    let popUpHeadline = document.getElementById("popUpHeadline");
    let popUpBody = document.getElementById("popUpBody");
    let popUp = document.getElementById("popUp");
    popUp.style.display = "none";
    TweenMax.to(popUp, 0, {alpha: 0, rotationY:-180}); // to: 到目標位置(選擇器, 時間(秒), {屬性})
    
    let cardWidth = 100;
    let cardHeight = 151;
    let spacingRight = 67;
    let spacingTop = 22;
    let numColumns = 4;
    let flipTime = 1;
    let backofCard = "./images/back.jpg";
    let gameHolder = document.getElementById("game");
    let anim = [];
    let cards = [
      {
        id: "<img src=" + "./images/11.png" + ">",
        headline: "",
        subhead: "",
        copy: "",
        image: "./images/11.png",
        largeImage: "./images/1.png",
        url: ""
      },
      {
          id: "<img src=" + "./images/22.png" + ">",
          headline: "",
          subhead: "",
          copy: "",
          image: "./images/22.png",
          largeImage: "./images/2.png",
          url: ""
      },
      {
          id: "<img src=" + "./images/33.png" + ">",
          headline: "",
          subhead: "",
          copy: "",
          image: "./images/33.png",
          largeImage: "./images/3.png",
          url: ""
      },
      {
          id: "<img src=" + "./images/44.png" + ">",
          headline: "",
          subhead: "",
          copy: "",
          image: "./images/44.png",
          largeImage: "./images/4.png",
          url: ""
      },
      {
          id: "<img src=" + "./images/55.png" + ">",
          headline: "",
          subhead: "",
          copy: "",
          image: "./images/55.png",
          largeImage: "./images/5.png",
          url: ""
      },
      {
          id: "<img src=" + "./images/66.png" + ">",
          headline: "",
          subhead: "",
          copy: "",
          image: "./images/66.png",
          largeImage: "./images/6.png",
          url: ""
      }
    ];

    let firstClick = null;
    let secondClick = null;
    let matchedID;

    // 遊戲開始的翻牌效果
    function flipCardsOver(){
      //交錯動畫(目標, 時間, {起點, 間隔數值, 完成後函數, 傳入回傳函數數組}, 函數作用範圍)
        TweenMax.staggerTo(anim, flipTime, {rotationY:-180, repeat:1, yoyo:true}, 0.2); 
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    let duplicateCards = createNewArray(cards);
    let totalCards = cards.concat(duplicateCards);
    shuffleArray(totalCards);

    let tl = new TimelineLite({onComplete:flipCardsOver});
          
    for(let i = 0; i < totalCards.length; i++){
      let cardWrapper = document.createElement("div");
        cardWrapper.id = "cardWrapper" + i;
              cardWrapper.thisID = i;
              cardWrapper.className = "cardWrapper";
        cardWrapper.style.position = "absolute";
              cardWrapper.style.overflow = "hidden";
        cardWrapper.style.width =  cardWidth + "px";
        cardWrapper.style.height = cardHeight + "px";
        cardWrapper.style.top = (parseInt(i / numColumns) * (cardHeight + spacingTop)) + "px";
        cardWrapper.style.left = ((i % numColumns) * (cardWidth + spacingRight)) + "px";
              cardWrapper.style.opacity = 0;
        gameHolder.appendChild(cardWrapper);

      let card = document.createElement("div");
        card.id = "card" + i;
        cardWrapper.appendChild(card);

      let front = document.createElement("div");
      front.id = "front";
      front.style.position = "absolute";
      front.className = "front";
      front.style.width =  cardWidth + "px";
      front.style.height = cardHeight + "px";
      front.innerHTML = "<img src=" + backofCard + ">";
      //front.innerHTML = "<p>card</p>"
      card.appendChild(front);

      let back = document.createElement("div");
      back.id = "back";
      back.style.position = "absolute";
      back.className = "back";
      back.style.width =  cardWidth + "px";
      back.style.height = cardHeight + "px";
      back.innerHTML = "<p>" + totalCards[i].id + "</p>";
      //back.innerHTML = "<img src=" + totalCards[i].image + ">";
      card.appendChild(back); 

      totalCards[i].cardWrapper = cardWrapper;
      totalCards[i].card = card;
      totalCards[i].back = back;
      totalCards[i].front = front;

      anim.push(card);

      TweenLite.set(totalCards[i].cardWrapper, {perspective:800});
      TweenLite.set(totalCards[i].card, {transformStyle:"preserve-3d"});
      TweenLite.set(totalCards[i].back, {rotationY:-180});
      TweenLite.set([totalCards[i].back, totalCards[i].front], {backfaceVisibility:"hidden"});

      cardWrapper.style.cursor = "pointer";            
          cardWrapper.addEventListener('click', thisClick, false);
          insertionTime = (i * .1);
          tl.add(TweenLite.to(totalCards[i].cardWrapper, .5, {alpha: 1}), insertionTime);
    }

      function thisClick(){
          this.style.cursor = "default";
          this.removeEventListener('click', thisClick, false);
          //flipCard(this.id, 180);
          flipCard(this.thisID, 180);
      }

      tl.totalDuration(2);

      TweenLite.set(popUp, {perspective:800});
      TweenLite.set(popUp, {transformStyle:"preserve-3d"});

      function flipCard(id, rotation){
          if(firstClick != null && secondClick == null){
              secondClick = id;
              checkpopUps();
          }else if (firstClick == null){
              firstClick = id;
          }
          TweenLite.to(totalCards[id].card , 1.2, {rotationY:rotation, ease:Back.easeOut});
      }

      function checkpopUps(){
          //trace(secondClick + " " + firstClick)
          if(totalCards[secondClick].id == totalCards[firstClick].id){
              trace("MATCH");
              popUpImage.innerHTML = "<img src=" + totalCards[firstClick].largeImage + ">"
              popUpHeadline.innerHTML = "<p>" + totalCards[firstClick].headline + " " + totalCards[firstClick].subhead + "</p>"
              popUpBody.innerHTML = "<p>" + totalCards[firstClick].copy +"</p>"
              TweenMax.to(popUp, 1.25, {alpha: 1, rotationY:0, delay: .35, ease:Back.easeOut, onStart:function(){popUp.style.display = "block"}});
              //remove from anim array so cards will not flip back if MATCH was made.
              anim.splice(anim.indexOf(document.getElementById("card" + firstClick)), 1);
              anim.splice(anim.indexOf(document.getElementById("card" + secondClick)), 1);
              matchedID = firstClick;
          }else{
              trace("MIS-MATCH");
              totalCards[firstClick].cardWrapper.style.cursor = "pointer";  
              totalCards[firstClick].cardWrapper.addEventListener('click', thisClick, false);
              totalCards[secondClick].cardWrapper.style.cursor = "pointer"; 
              totalCards[secondClick].cardWrapper.addEventListener('click', thisClick, false);   
              TweenMax.staggerTo(anim, 1, {rotationY:0, delay: .5});
          }

          firstClick = null;
          secondClick = null;
      }

      popUp.style.cursor = "pointer";
      popUp.onclick = function(){
          TweenMax.to(popUp, .75, {alpha: 0, rotationY:-180, ease:Back.easeOut, onComplete:function(){popUp.style.display = "none";}});
          TweenMax.staggerTo(anim, 1, {rotationY:0, delay: .5});

          if(totalCards[matchedID].url !== ""){
              window.open(totalCards[matchedID].url);
          }
      }

      function createNewArray(arr){
          let tmp = [];
          for (let i = 0; i<arr.length; i++){
              tmp.push(clone(arr[i]));
          }
         // trace("tmp.length: " + tmp.length)
          return tmp;
      }

      function clone(obj) {
         let target = {};
         for (let i in obj) {
              if (obj.hasOwnProperty(i)) {
                  //console.log(i)
                  target[i] = obj[i];
              }
         }
          return target;
      }

  }
