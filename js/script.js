let currentsong = new Audio();
let songs;
let currfolder;

function formatTime(seconds) {
    // Calculate minutes and remaining seconds

    if (isNaN(seconds) || seconds < 0) {
        return "00:00"
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    // Format minutes and seconds with leading zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Combine minutes and seconds into the desired format
    return `${formattedMinutes}:${formattedSeconds}`;
}

// // Example usage:
// const inputSeconds = 12;
// const formattedTime = formatTime(inputSeconds);
// console.log(formattedTime);  // Output: "00:12"


async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${currfolder}/`)[1])
        }

    }






    // show all songs in plaYlist
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songul.innerHTML = ""
    for (const song of songs) {
        songul.innerHTML += `<li>
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div class="title"> ${song.replaceAll("%20", " ")}</div>
                                <div>sathvik</div>
                            </div>
                            <div class="playnow">
                                <span>play now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div> </li>`;
    }

    //atch event listner toeach song

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    return songs


}

//event listner for play,next,previous
play.addEventListener("click", (e) => {
    if (currentsong.paused) {
        currentsong.play()
        play.src = "img/pause.svg"
    }
    else {
        currentsong.pause()
        play.src = "img/play.svg"
    }
})

const playmusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)
    currentsong.src = `/${currfolder}/` + track

    if (!pause) {
        currentsong.play();
        play.src = "img/pause.svg"
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}




async function displayAlbums() {
    let a = await fetch(`/songs/`);
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".card-container")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs/") && !e.href.includes(".htaccess")) {
            let folder = (e.href.split("/")[4])
           
          

            //    get the meta data
            // let a = await fetch(`/songs/${folder}/info.json`)
            const url = new URL('/songs/info.json', window.location.origin);
            url.pathname = `/songs/${folder}/info.json`;
            let a = await fetch(url.href);
            let response = await a.json();
            cardContainer.innerHTML = cardContainer.innerHTML + `<div class="card" data-folder="${folder}">
                        <div class="playButton" >
                            <img src="img/play.png" alt="">
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <h3>${response.title}</h3>
                        <p>${response.description}</p>
                    </div>`
        }
    }

    //load playlist when card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log("fetching songs")
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            playmusic(songs[0])
            //     try {
            //         console.log(item.currentTarget.dataset);
            //         const songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            //         console.log(songs); // Use songs as needed
            //     } catch (error) {
            //         console.error("Error fetching songs:", error);
            //     }
            // });
        })
    })
}

function search() {
    let input = document.getElementById("searchbar").value.toLowerCase();
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")
    console.log(songul);

    for (let i = 0; i < li.length; i++) {
        let txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toLowerCase().includes(input)) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}





    // Initialize the search function



    //for search icon manipulation

    // function search(){
    //     document.getElementById("searchItem").addEventListener("click",(e)=>{
    //         console.log(e)
    //         // const li = this;
    //         const input = document.createElement('input');
    //         // input.id = 'sear';
    //         input.classList.add("sear")
    //         input.type = 'text';
    //         input.value = '';
    //         let li = e.currentTarget
    //         li.innerHTML = ""
    //         li.appendChild(input)
    //         input.focus();
    //         input.addEventListener('blur', function() {
    //             li.innerHTML = '<img class="invert search" src="img/serach.svg" alt="search">Search';
    //         });

    //         // console.log(li)

    //    })

    //     // console.log("pressed");
    // }

    // function search() {
    //     var input, filter, ul, li, a, i, txtValue;
    //     input = document.getElementsByClassName("sear")[0];
    //     console.log(input);
    //     filter = input.value.toUpperCase();
    //     ul = document.querySelector(".songlist").getElementsByTagName("ul");
    //     li = ul.getElementsByTagName("li");
    //     for (i = 0; i < li.length; i++) {
    //         a = li[i].getElementsByTagName("a")[0];
    //         txtValue = a.textContent || a.innerText;
    //         if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //             li[i].style.display = "";
    //         } else {
    //             li[i].style.display = "none";
    //         }
    //     }
    // }

    // document.getElementById("searchItem").addEventListener("keyup",()=>{
    //     sort();
    // })

    // document.querySelector(".search").innerHTML=`<input type="text" placeholder="search">`


    async function main() {

        // get the list of all songs 

        await getsongs("songs/cs")

        playmusic(songs[0], true)

        // display all the albums in the page 

        displayAlbums()



        // listen for time update event

        currentsong.addEventListener("timeupdate", () => {
            // console.log(currentsong.currentTime, currentsong.duration);
            document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`;

            document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
        })

        // evnt to sekbar
        document.querySelector(".seekbar").addEventListener("click", e => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".circle").style.left = percent + "%";
            currentsong.currentTime = (currentsong.duration * percent) / 100;
        })

        //add event to for hambureger
        document.querySelector(".hamburger").addEventListener("click", () => {
            document.querySelector(".left").style.left = "0"
        })

        //add event for close
        document.querySelector(".close").addEventListener("click", () => {
            document.querySelector(".left").style.left = "-125%"
        })

        //add event listner to previous
        previous.addEventListener("click", () => {
            let index = songs.indexOf(currentsong.src.split("/").splice(-1)[0])

            if ((index - 1) >= 0) {
                playmusic(songs[index - 1])
            }
        })

        //add event listner to next
        next.addEventListener("click", () => {

            let index = songs.indexOf(currentsong.src.split("/").pop())

            if ((index + 1) < songs.length) {
                playmusic(songs[index + 1])
            }



        })

        //add event to volume

        document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
            // console.log("volume changed to ",e.target.value)
            currentsong.volume = parseInt(e.target.value) / 100
        })


        // add event to mute the track 
        document.querySelector(".volume>img").addEventListener("click", e => {
            if (e.target.src.includes("img/volume.svg")) {
                e.target.src = "img/mute.svg";
                document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
                currentsong.volume = 0;
            } else {
                e.target.src = "img/volume.svg";
                document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
                currentsong.volume = 0.1;
            }
        })











    }

    main()

