const sounds = {
  w: "tom-1",
  a: "tom-2",
  s: "tom-3",
  d: "tom-4",
  j: "snare",
  k: "kick",
  l: "crash",
  h: "hihat",
  r: "ride",
};

$(".drum").click(function () {
  // Lowercase so that even if Caps Lock is on,
  // the drum will play and animate.
  let key = this.classList[0].toLowerCase();
  playAudio(key);
  animateDrum(key);
});

// Can't use jQuery as its event object doesn't have repeat property.
// We have to use repeat to prevent the drum from continously playing
// when key is hold.
document.addEventListener("keydown", function (e) {
  if (e.repeat) {
    return;
  }

  let key = e.key.toLowerCase();
  playAudio(key);
  animateDrum(key);
});

function playAudio(key) {
  // Checking key in object is optional, but I am using it
  // for performance, as if user presses a key which is not present
  // in object, then searching the audio resource will throw
  // error 400 in background.
  if (key in sounds) {
    let audio = new Audio("sounds/" + sounds[key] + ".mp3");
    audio.play();
  }
}

function animateDrum(key) {
  let activeDrum = $("." + key);
  activeDrum.addClass("pressed");
  setTimeout(() => {
    activeDrum.removeClass("pressed");
  }, 50);
}
