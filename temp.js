const pup = require("puppeteer");
let fs = require("fs");

async function main(){
    let browser = await pup.launch({
        headless : false,
        defaultViewport : false,
        args : ["--start-maximized"]
    });
    let headlines = {
        "ET" : {},
        "Hindu" : {},
        "HT" : {},
        "TOI" : {},
        "covid" : {}
    };
    let pages = await browser.pages();
    tab = pages[0];
    await tab.goto("https://economictimes.indiatimes.com/");

    await tab.waitForSelector(".latestTopstry.flt", {visible : true});
    let ETnews = await tab.$$(".latestTopstry.flt");

    for(let i=0 ; i<ETnews.length ; i++){
        let headline = await tab.evaluate(function(ele){
                return ele.getAttribute("alt");                                 
        }, ETnews[i]);
        headlines["ET"][i] = headline;
    }
    let ETnews2 = await tab.$$(".smallImg.flt");
    let headline = await tab.evaluate(function(ele){
                return ele.getAttribute("alt");                                 
        }, ETnews2[0]);
    headlines["ET"][ETnews.length] = headline;
    headlines["ET"]["img"] = await tab.evaluate(function(ele){
                            return ele.getAttribute("src");                                 
                    }, ETnews[2]);
    headlines["Hindu"]["img"] = await tab.evaluate(function(ele){
                            return ele.getAttribute("src");                                 
                    }, ETnews[3]);
    headlines["HT"]["img"] = await tab.evaluate(function(ele){
                            return ele.getAttribute("src");                                 
                    }, ETnews[4]);
    headlines["TOI"]["img"] = await tab.evaluate(function(ele){
                            return ele.getAttribute("src");                                 
                    }, ETnews[1]);
    
    await tab.goto("https://www.thehindu.com/");

    await tab.waitForSelector(".story-card-news h3", {visible : true});
    let HinduNews1 = await tab.$$(".story-card-news h3");

    await tab.waitForSelector(".story-card-news h2", {visible : true});
    let HinduNews2 = await tab.$$(".story-card-news h2");

    for(let i=0 ; i<7 ; i++){
        if(i<HinduNews1.length){
            let headline = await tab.evaluate(function(ele){
                    return ele.textContent;                                 
            }, HinduNews1[i]);
            let newstr = trimEndLine(headline);

            headlines["Hindu"][i] = newstr;
        }
        else {
                let headline = await tab.evaluate(function(ele){
                    return ele.textContent;                                 
            }, HinduNews2[i-HinduNews1.length]);
            let newstr = trimEndLine(headline);

            headlines["Hindu"][i] = newstr;
        }
    }

    await tab.goto("https://www.hindustantimes.com/");

    await tab.waitForSelector(".hdg3 a", {visible : true});
    let HTNews = await tab.$$(".hdg3 a");

    for(let i=0 ; i<7 ; i++){
        let headline = await tab.evaluate(function(ele){
                return ele.textContent;                                 
        }, HTNews[i]);
        let newstr = trimEndLine(headline);

        headlines["HT"][i] = newstr;
    }
;
    

    await tab.goto("https://timesofindia.indiatimes.com/india");

    // await tab.waitForNavigation({waitUntil : "networkidle2"});

    await tab.waitForSelector("#c_wdt_list_1 .w_tle a", {visible : true});
    let TOINews = await tab.$$("#c_wdt_list_1 .w_tle a");

    for(let i=0 ; i<7 ; i++){
        let headline = await tab.evaluate(function(ele){
                return ele.textContent;                                 
        }, TOINews[i]);
        let newstr = trimEndLine(headline);

        headlines["TOI"][i] = newstr;
    }

    await tab.goto("https://www.mygov.in/covid-19");
    let cases = await tab.$$(".icount");
    
    for(let i=0 ; i<4 ; i++){
        let each_case = await tab.evaluate(function(ele){
                return ele.textContent;                                 
        }, cases[i]);
        // let newstr = trimEndLine(headline);

        headlines["covid"][i] = each_case;
    }

    console.log(headlines);

    fs.writeFileSync("finalDa.json", JSON.stringify(headlines));
    function trimEndLine(headline){
        let newstr = "";
        for( let i = 0; i < headline.length; i++ ) 
            if( !(headline[i] == '\n' || headline[i] == '\r') )
                newstr += headline[i];
                
        return newstr;
    }


}
main();