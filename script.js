// AUTOMATION
let headlines = require("./finalData.js");
  

for(let i=0 ; i<3 ; i++){
    let ETdiv = `<ul><li><div class = "headline">${headlines["ET"][i]}</div></li><ul>`;
    let Hindudiv = `<ul><li><div class = "headline">${headlines["Hindu"][i]}</div></li></ul>`;
    let HTdiv = `<ul><li><div class = "headline">${headlines["HT"][i]}</div></li></ul>`;
    let TOIdiv = `<ul><li><div class = "headline">${headlines["TOI"][i]}</div></li></ul>`;
    $(".ETnews .lower").append(ETdiv);
    $(".THnews .lower").append(Hindudiv);
    $(".HTnews .lower").append(HTdiv);
    $(".TOInews .lower").append(TOIdiv);
}

$(".news").click(function(e) {
    if($(this).hasClass("ETnews")){
        appendModal("The Economic Times", headlines["ET"], "https://economictimes.indiatimes.com/");
    }
    else if($(this).hasClass("THnews")){
        appendModal("The Hindu", headlines["Hindu"], "https://www.thehindu.com/");
    }
    else if($(this).hasClass("HTnews")){
        appendModal("The Hindustan Times", headlines["HT"], "https://www.hindustantimes.com/");
    }
    else if($(this).hasClass("TOInews")){
        appendModal("Times Of India", headlines["TOI"], "https://timesofindia.indiatimes.com/");
    }
});

function appendModal(name, content, link) {
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    $(".news-modal-parent").remove();
    let newModal = $(`<div class = "news-modal-parent">
                        <div class = "news-modal-container">
                            <div class = "head-date-container">
                                <div class = "newspaper">${name}</div>
                                <div class = "date">${today}</div>
                            </div>
                            <div class = "news-items-container">
                                <div class = "left-items">
                                    <li class = "item">${content[0]}</li>
                                    <li class = "item">${content[1]}</li>
                                    <li class = 'item'>${content[2]}</li>
                                </div>
                                <div class = "middle-items">
                                    <img class = "item image" src=${content["img"]} alt=""/>
                                    <li class = "item">${content[3]}</li>
                                </div>
                                <div class = "right-items">
                                    <li class = "item">${content[4]}</li>
                                    <li class = "item">${content[5]}</li>
                                    <li class = 'item'>${content[6]}</li>                    
                                </div>
                            </div>
                            <div class = "link-container">
                            <a href=${link}>Visit the site for more details!!</a>
                            </div>
                        </div>
                    </div>`);
    $(".main-container").append(newModal);
    
    $(".head-date-container").click(function(){
        
        newModal.remove();
    });
}
let flag = false;
$(".bottom-container").click(function(e) {

    $(".notes-modal-parent").toggleClass("hide");

    
    $(".notes-modal-parent").animate({
        height : "100vh"
      }, 800);
    $(".notes-heading").click(function(){
        $(".notes-modal-parent").animate({
            height : "0vh"
        }, 800);
    });
    let ticketIdx = 1;
    let ticketColor = ["linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)", "linear-gradient(90deg, #fcff9e 0%, #c67700 100%)", "linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)", "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"];
    let information1 = "This is the NOTES SECTION. Make short notes of news you read to help yourself in better retaining of data."
    let information2 = "Click to add a Personalised Note for your better understanding of Today's News"
    if(flag == false){
        flag = true;
        $(".add").click(function(e) {
            let ticket = $(`<div class = "stick-note" style="background: ${ticketColor[ticketIdx%4]};">
                                <div class="s-title">
                                    <div class = "material-icons s-close">close</div>
                                    <div class = "s-head" id = ""># Note-${ticketIdx}</div>
                                </div>
                                <div class="s-content"spellcheck = "false" data-type="false" contenteditable="true"></div>
                            </div>`);
            ticketIdx++;
            $(".notes-tickets").append(ticket);

            $(".s-close").click(function(e) {
                e.currentTarget.parentElement.parentElement.remove();
                if(ticketIdx<=0){
                    ticketIdx = 1;
                }
            }) 
        });
    }

    $(".info").mouseenter(function(e) {
        let info_data = $(`<div class="s-modal">${information1}</div>`)
        $(".info").append(info_data);
        info_data.animate({
            height : "140px"
        }, 300);
    });

    $(".info").mouseleave(function(e) {

        $(".info .s-modal").animate({
            height : "0px"
        }, 300);
        
        setTimeout(() => {
            $(".info .s-modal").remove();
            
        }, 300);
    });

    $(".add").mouseenter(function(e) {
        let add_data = $(`<div class="s-modal">${information2}</div>`)
        $(".add").append(add_data);
        add_data.animate({
            height : "140px"
        }, 300);
    });

    $(".add").mouseleave(function(e) {

        $(".add .s-modal").animate({
            height : "0px"
        }, 300);
        
        setTimeout(() => {
            $(".add .s-modal").remove();
            
        }, 300);
    });

    });


    $(".covid").click(function(e) {
        $(".covid-cases").remove();
        $(".close-div").remove();
        $(".covid-tracker").addClass("hide");
        let closeBtn = $(`<div class = "close-div">
                            <span class="material-icons">
                                close
                                </span>
                        </div>`);
        let covidCases = $(`<div class = "covid-cases">
                                    <div class="cases" id="curr">Active-Cases: ${headlines["covid"][0]}</div>
                                    <div class="cases" id="total">Total-Cases : ${headlines["covid"][1]}</div>
                                    <div class="cases" id="discharge">Discharged : ${headlines["covid"][2]}</div>
                                    <div class="cases" id="death">Deaths : ${headlines["covid"][3]}</div>
                                </div>`);
        
        let track = $(`<div class = "covid-tracker">INDIA</div>`);
        $(".covid").prepend(covidCases);
        $(".covid").append(track);
        $(".news-container").prepend(closeBtn);
        covidCases.animate({
            width : "85%"
        }, 500)
        closeBtn.click(function(){
            covidCases.animate({
                width : "0%"
            }, 500);
            setTimeout(() => {
                covidCases.remove();
                track.remove();
                closeBtn.remove();
                $(".covid-tracker").removeClass("hide");
            }, 400);
        });
})


$(".timeout-modal").animate({
    fontSize: "4.5em"
}, 2000);

setTimeout(() => {
    $(".timeout-modal").animate({
        height : "0vh"
    }, 4000);
    
}, 2000);
setTimeout(() => {
    $(".timeout-modal").addClass("hide");
}, 4000);


$(".news-ss").mouseenter(function(){
    let info_data = $(`<div class = "ss-info">Take ScreenShot</div>`)
    $(".ss").append(info_data);
    info_data.animate({
        width : "150px"
    }, 300);
});

$(".news-ss, .notes-ss").click(function(){
    takeshot();
});

$(".news-ss").mouseleave(function(e) {

    $(".ss-info").animate({
        width : "0px"
    }, 300);
    
    setTimeout(() => {
        $(".ss-info").remove();
        
    }, 300);
});


function takeshot() {
    let ele = document.querySelector(".main-container");

    // Use the html2canvas
    // function to take a screenshot
    // and append it
    // to the output div
    html2canvas(ele).then(
        function (canvas) {
            
            console.log(canvas);

            let dld = "image.png";  // download img name
            let link = canvas.toDataURL(); // all the data which is present in the canvas in the form if image is converted into URL
            let a = $(`<a href=${link} download=${dld}></a>`); // anchor tag created
            a[0].click();
            a.remove();
        })
}