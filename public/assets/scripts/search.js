
//#region Services Pagination
try {
    let pageSize = Number(
        document
            .querySelector(".paginationHolder")
            .getAttribute("data-pageSize"),
    );
    let allServiceList = document.querySelectorAll(".offerList");
    let pagiNextBtn = document.querySelector(".paginationBtns .nextbtns");
    let pagiPrevBtn = document.querySelector(".paginationBtns .prevbtns");
    let pageNumber = document.querySelector(".paginationBtns .pageNumber");
    var currentPosition,
        lastPosition = allServiceList.length;
    var pageNo = 1;
    allServiceList.forEach((serviceItem) => {
        if (serviceItem.classList.contains("pageCounter")) {
            currentPosition =
                Number(serviceItem.children[0].textContent) - 1;
            return;
        }
    });
    updatePageNumber();

    pagiNextBtn.addEventListener("click", () => {
        paginate("next");
        updatePageNumber();
    });

    pagiPrevBtn.addEventListener("click", () => {
        paginate("prev");
        updatePageNumber();
    });

    function paginate(paginateType) {
        allServiceList.forEach((serviceItem) => {
            serviceItem.classList.add("hidden");
            serviceItem.classList.remove("pageCounter");
        });

        if (paginateType == "next") {
            if (currentPosition + pageSize < lastPosition)
                currentPosition = currentPosition + pageSize;
            else {
                //block Next Button
            }
        } else if (paginateType == "prev") {
            if (currentPosition - pageSize >= 0)
                currentPosition = currentPosition - pageSize;
            else {
                //block prev Button
            }
        }

        pageNo = currentPosition / pageSize + 1;

        allServiceList[currentPosition].classList.add("pageCounter");

        allServiceList.forEach((serviceItem, index) => {
            if (serviceItem.classList.contains("pageCounter")) {
                for (let i = 0; i < pageSize; i++) {
                    if (index + i < allServiceList.length)
                        allServiceList[index + i].classList.remove(
                            "hidden",
                        );
                }
            }
        });
    }
    function updatePageNumber() {
        pageNumber.textContent = `${pageNo} of ${Math.ceil(allServiceList.length / pageSize)}`;
    }
} catch (error) {}
//#endregion

//#region Search results
//Functions
function getPanelsCards(rating, service, websiteURL, imageSrc, panelTitle, slugURL){
    var ratingCollection = [];
    for (let j = 0; j < 5; j++) {
        if(j < rating)
            ratingCollection.push("fa-solid fa-star");
        else
            ratingCollection.push("fa-regular fa-star");
    }
    return `
    <article class="lg:w-[32%] md:w-[48%] w-full rounded-lg bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all ease-in-out duration-150">
    
    <a href=${"/panels/" + slugURL}>
        <img src=
        ${
            imageSrc != ""
            ? imageSrc 
            :"/assets/images/no-image-available.jpg"
        } 
        alt="${panelTitle + " thumbnail"}" class="h-52 w-full rounded-tl-lg rounded-tr-lg hover:brightness-75">
    </a>

    <div class="data w-full">
        <div class="articleLink p-3 w-full flex justify-between">
            <span>
                <h2 class="font-bold hover:underline"><a href=${"/panels/" + slugURL}>${panelTitle}</a></h2>
                <span class="flex gap-1 items-center text-yellow-400 text-sm mt-2" title="${rating} of 5">
                    ${
                        ratingCollection.map(rating =>{
                            return `<i class="${rating.toString()}"></i>`
                        }).join('')
                    } <span class="text-black">${rating}/5</span>
                </span>
            </span>
            <span>
                ${service.toString()} ${service > 1 ? "Services" : "Service"}
            </span>
        </div>
                
        <div class="websiteLink p-3 bg-slate-200 rounded-bl-lg rounded-br-lg">
            <a href="${websiteURL}" target="_blank" class="text-sm hover:font-semibold"><i class="fa-solid fa-link"></i> ${websiteURL.split("/")[0] + "//" + websiteURL.split("/")[2]}</a>
        </div>
    </div>
</article>
`
}

function getServicesCards(title, imageLogoPath, servicesCount) {
    return `
    <article class="cursor-pointer bg-[#f3f5f6] hover:bg-white flex flex-col lg:flex-row lg:justify-start justify-center lg:items-start items-center lg:text-left text-center gap-2 lg:w-[32%] w-[47%] p-3 border rounded-md shadow-md hover:shadow-2xl">
        <a href="${"/services/"+ title.toLowerCase().replaceAll(" ", "-")}"><img alt="${title}" class="rounded-lg size-20" src="${imageLogoPath}"></a>
        <span>
            <h2 class="font-semibold hover:underline"><a href="${"/services/"+ title.toLowerCase().replaceAll(" ", "-")}">${title}</a></h2>
            <span class="block">${servicesCount}+ Services</span>
        </span>
    </article>
    `
}

function getPanelCount(searchTerm){
    var count=0;
    const allServices = document.querySelectorAll(".offerList");
    allServices.forEach(service => {
        if(service.textContent.includes(searchTerm))
            count++;
    });
    return count;
}

function getServiceCount(searchTerm){
    var count=0;
    const allServicesTitle = document.querySelectorAll(".offer_service");
    
    allServicesTitle.forEach(serviceTitle => {
        if(serviceTitle.textContent.includes(searchTerm))
            count++;
    });
    return count;
}

function creatingPanelResults(panels) {
    var panelContainer = document.getElementById("panelsWrapper");
    if(panels.length > 0){
        document.querySelector(".searchResultsPanels").classList.remove("hidden");
        for (let i = 0; i < panels.length; i++) {
            panelContainer.insertAdjacentHTML("afterbegin", getPanelsCards(
                panels[i].rating,
                getPanelCount(panels[i].panelTitle),
                panels[i].panelWebsiteURL,
                panels[i].paneFeaturedImage == null ? "" : panels[i].paneFeaturedImage.url ,
                panels[i].panelTitle,
                panels[i].panelSlug,
            ))
        }
    }
    else{
        document.querySelector(".searchResultsPanels").remove();
    }
}
//var AllServices;
function creatingServiceResults(services) {
    var serviceContainer = document.getElementById("servicesWrapper");
    if(services.length > 0){
        document.querySelector(".searchResultsServices").classList.remove("hidden");
        for (let i = 0; i < services.length; i++) {
            serviceContainer.insertAdjacentHTML("beforeend", getServicesCards(
                services[i].serviceTitle,
                services[i].serviceLogo == null ? "" : services[i].serviceLogo.url,
                getServiceCount(services[i].serviceTitle)
            ))
        }
    }
    else{
        document.querySelector(".searchResultsServices").remove();
    }
}

const searchURL = window.location.href;
var url = new URL(searchURL);
var params = new URLSearchParams(url.search);
var query = params.get("q");
var allWordsInQuery = query.split(" ");

document.title = `Search results for "${query}" - ${document.title}`;

    //#region Search among Panels
    let panelsFound = [];
    fetch("/api/panels.json").then(response => response.json())
    .then(data => {
        
        for (let i = 0; i < data.length; i++) {
            const allResults = data[i].panelTitle;
            
            for (let j = 0; j < allWordsInQuery.length; j++) {
                if(allResults.toLowerCase().includes(allWordsInQuery[j].toLowerCase())){
                    panelsFound.push(data[i]);
                }
            }
        }
        creatingPanelResults(panelsFound);
    })
    //#endregion

    //#region Search among Listed Services
    let servicesFound = [];
    fetch("/api/services.json").then(response => response.json())
    .then(data => {
        
        for (let i = 0; i < data.length; i++) {
            const allResults = data[i].serviceTitle;
            
            for (let j = 0; j < allWordsInQuery.length; j++) {
                if(allResults.toLowerCase().includes(allWordsInQuery[j].toLowerCase())){
                    if(!servicesFound.includes(data[i]))
                        servicesFound.push(data[i]);
                }
            }
        }

        //AllServices = servicesFound;
        //console.log(servicesFound);
        creatingServiceResults(servicesFound);
    })
    //#endregion
    
    function isSearchResultsFound() {
        if(servicesFound.length == 0 && panelsFound.length == 0){
            document.querySelector(".searchResTitle").classList.add("text-center");
            document.querySelector(".searchResTitle").textContent = `No results found for "${query}"`;
        }
        else
            document.querySelector(".searchResTitle").textContent = `Search results for "${query}"`;
    }
    setInterval(isSearchResultsFound, 1000);
//#endregion