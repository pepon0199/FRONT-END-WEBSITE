(() =>{
  const open_nav_menu = document.querySelector(".open-nav-menu"),
  close_nav_menu = document.querySelector(".close-nav-menu"),
  nav_menu = document.querySelector(".nav-menu"),
  menu_overlay = document.querySelector(".menu-overlay"), media_size = 1115;

  open_nav_menu.addEventListener("click", toggleNav);
  close_nav_menu.addEventListener("click", toggleNav);
  menu_overlay.addEventListener("click", toggleNav);  //close the navmenu by clicking outside

  function toggleNav() {
    nav_menu.classList.toggle("open");
    menu_overlay.classList.toggle("active");
    document.body.classList.toggle("hidden-scrolling");
  }

  nav_menu.addEventListener("click", (event) =>{
    if(event.target.hasAttribute("data-toggle") && window.innerWidth <=media_size){

      event.preventDefault(); //prevent anchor click behaviour
      const menuItemHasChildren = event.target.parentElement;
      //if menuItemHasChildren is already expanded, collapse it
      if (menuItemHasChildren.classList.contains("active")) {
        collapseSubMenu();
      }else{
      //Collapse existing expanded menuItemHasChildren
        if(nav_menu.querySelector(".menu-item-has-children.active")){
          collapseSubMenu();
        }
        // expand new menuItemHasChildren

        menuItemHasChildren.classList.add("active");
        const sub_menu = menuItemHasChildren.querySelector(".sub-menu");
        sub_menu.style.maxHeight = sub_menu.scrollHeight + "px";
      }
    }
  });
  function collapseSubMenu(){
    nav_menu.querySelector(".menu-item-has-children.active .sub-menu")
    .removeAttribute("style");
    nav_menu.querySelector(".menu-item-has-children.active")
    .classList.remove("active");
  }
  function resizeFix() {
    //if nav_menu is open, close it
    if (nav_menu.classList.contains(".open")) {
      toggleNav();
    }
    // if menuItemHasChildren is expanded, collapse interval
    if (nav_menu.querySelector(".menu-item-has-children.active")) {
      collapseSubMenu();
    }
  }
  window.addEventListener("resize", function() {
    if(this.innerWidth > media_size){
      resizeFix();
    }
  }())
})();

//slider CODE
const myslide = document.querySelectorAll('.myslide'),
	    dot = document.querySelectorAll('.dot');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
	counter += 1;
	slidefun(counter);
}
function plusSlides(n) {
	counter += n;
	slidefun(counter);
	resetTimer();
}
function currentSlide(n) {
	counter = n;
	slidefun(counter);
	resetTimer();
}
function resetTimer() {
	clearInterval(timer);
	timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {

	let i;
	for(i = 0;i<myslide.length;i++){
		myslide[i].style.display = "none";
	}
	for(i = 0;i<dot.length;i++) {
		dot[i].className = dot[i].className.replace(' active', '');
	}
	if(n > myslide.length){
	   counter = 1;
	   }
	if(n < 1){
	   counter = myslide.length;
	   }
	myslide[counter - 1].style.display = "block";
	dot[counter - 1].className += " active";
}

// changemenucolorwhenscrolling
jQuery(function($){
  var $navbar = $('.header-main');
  $(window).scroll(function (event) {
    var $current = $(this).scrollTop();
    if ($current > 0) {
      $navbar.addClass("menubar-changecolor");

    }else{
      $navbar.removeClass("menubar-changecolor");
    }
  });
});



//GO TO UPPERPAGE WHEN CLICKING THE ARROW
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})

//Email JS
function validate(){
    let name = document.querySelector(".contact-form-txt")
    let email = document.querySelector(".contact-form-email")
    let msg = document.querySelector(".contact-form-txtarea")
    let sendbtn = document.querySelector(".contact-form-btn")

    sendbtn.addEventListener("click", (e) =>{
        e.preventDefault();
        if(name.value == "" || email.value == "" || msg.value == ""){
            emptyerror();
        }else{
            sendmail(name.value, email.value, msg.value);
            success();
        }
    })
}

validate();

function sendmail(name,email,msg){
    emailjs.send("service_9jrjtfj","template_h5c6nhi",{
        from_name: email,
        to_name: name,
        message: msg,
        });
}

function emptyerror(){
    swal({
        title: "Oh no..",
        text: "Fields cannot be empty!",
        icon: "error",
      });
}

function success(){
    swal({
        title: "Email sent successfully",
        text: "We try to reply in 24 hours",
        icon: "success",
      });
}
