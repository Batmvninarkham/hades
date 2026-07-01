let streamNodes = [];
let current = 0;

window.addEventListener("load", async () => {

    await loadCategories();

    wireButtons();

    await load("/api/stream/live");

});
async function loadCategories() {

    const response =
        await fetch("/api/stream");

    const categories =
        await response.json();

    const select =
        document.getElementById("categorySelect");

    select.innerHTML =
        `<option value="">Select Category</option>`;

    for (const category of categories) {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        select.appendChild(option);

    }

}
function wireButtons() {

    document
        .getElementById("liveBtn")
        .onclick = () =>
            load("/api/stream/live");

    document
        .getElementById("todayBtn")
        .onclick = () =>
            load("/api/stream/today");

    document
        .getElementById("livePopularBtn")
        .onclick = () =>
            load("/api/stream/live/popular");

    document
        .getElementById("todayPopularBtn")
        .onclick = () =>
            load("/api/stream/today/popular");

    document
        .getElementById("categoryBtn")
        .onclick = () => {

            const category =
                document
                    .getElementById("categorySelect")
                    .value;

            if (!category)
                return;

            load(
                `/api/stream?category=${category}`
            );

        };

    document
        .getElementById("categoryPopularBtn")
        .onclick = () => {

            const category =
                document
                    .getElementById("categorySelect")
                    .value;

            if (!category)
                return;

            load(
                `/api/stream?category=${category}&popular=true`
            );

        };

}
async function load(endpoint) {

    const status =
        document.getElementById("status");

    status.textContent =
        "loading...";

    const response =
        await fetch(endpoint);

    const matches =
        await response.json();

    renderMatches(matches);

}
function renderMatches(matches) {

    const container =
        document.getElementById("matches");

    container.innerHTML = "";

    streamNodes = [];

    current = 0;

    for (const match of matches) {

        const matchDiv =
            document.createElement("div");

        matchDiv.className = "match";

        const title =
            document.createElement("div");

        title.className =
            "match-header";

        title.textContent =
            match.title;

        matchDiv.appendChild(title);

        for (const stream of match.streams) {

            const node =
                document.createElement("div");

            node.className =
                "stream";

            node.textContent =
                `stream ${stream.streamNo} | viewers ${stream.viewers}`;

            node.dataset.url =
                stream.embedUrl;

            node.onclick =
                () => loadStream(
                    stream.embedUrl,
                    node
                );

            streamNodes.push(node);

            matchDiv.appendChild(node);

        }

        container.appendChild(matchDiv);

    }

    highlight(current);

    document
        .getElementById("status")
        .textContent =
        `${matches.length} matches loaded`;

}

function loadStream(url, element) {

    document
        .querySelectorAll(".stream")
        .forEach(el =>
            el.classList.remove("active")
        );

    element.classList.add("active");

    document
        .getElementById("stream-player")
        .src = url;

    document
        .getElementById("status")
        .textContent = url;

}

function highlight(index) {

    streamNodes.forEach(node =>
        node.classList.remove("active")
    );

    if (!streamNodes[index])
        return;

    streamNodes[index]
        .classList.add("active");

    streamNodes[index]
        .scrollIntoView({

            block: "nearest"

        });

}
document.addEventListener("keydown", e => {

    if (e.key === "ArrowDown") {

        current =
            Math.min(
                current + 1,
                streamNodes.length - 1
            );

        highlight(current);

    }

    if (e.key === "ArrowUp") {

        current =
            Math.max(
                current - 1,
                0
            );

        highlight(current);

    }

    if (e.key === "Enter") {

        const node =
            streamNodes[current];

        if (!node)
            return;

        loadStream(
            node.dataset.url,
            node
        );

    }

});
