
//#region Search results

function search(nodes, query) {
    // Split the query into individual words
    const queryWords = query.split(" ");

    // Filter the nodes to get only the elements containing all words from the query
    const result = Array.from(nodes).filter((node) => {
        // Extract text content from the node
        const textContent = node.textContent.toLowerCase();

        // Check if all words from the query are present in the text content
        return queryWords.every((word) => textContent.includes(word.toLowerCase()));
    });

    return result;
}

const searchURL = window.location.href;
var url = new URL(searchURL);
var params = new URLSearchParams(url.search);
var query = params.get("q");

const allServices = document.querySelectorAll(".offer_service");
var resultData = search(allServices, query);

allServices.forEach(serviceData => {
    if(!resultData.includes(serviceData))
        serviceData.parentElement.remove();
});
//#endregion

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
    
    if(allServiceList.length == 0){
        document.querySelector(".services").remove();
        document.querySelector(".searchResTitle").textContent = `No Service found related to "${query}"`;
        document.querySelector(".searchResTitle").classList.add("text-center");
        document.title = `No Results found for "${query}" - ${document.title}`;
    }
    else
    {
        document.querySelector(".searchResTitle").textContent = `Search results for "${query}"`;
        document.querySelector("#serviceHeading").textContent = `${allServiceList.length} Services Found`;
        document.title = `Search results for "${query}" - ${document.title}`;
    }

    allServiceList[0].classList.add("pageCounter")
    //Unhide Initial Results
    for (let i = 0; i < pageSize; i++) {
        allServiceList[i].classList.remove("hidden");
        allServiceList[i].classList.add("flex");
    }
    
    allServiceList.forEach((serviceItem) => {
        if (serviceItem.classList.contains("pageCounter")) {
            var array = Array.from(allServiceList);
            currentPosition = array.indexOf(serviceItem);
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
        allServiceList = document.querySelectorAll(".offerList");
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
                    if (index + i < allServiceList.length){
                        allServiceList[index + i].classList.remove("hidden");
                        allServiceList[index + i].classList.add("flex");
                    }
                }
            }
        });
    }
    function updatePageNumber() {
        pageNumber.textContent = `${pageNo} of ${Math.ceil(allServiceList.length / pageSize)}`;
    }
} catch (error) {}
//#endregion
