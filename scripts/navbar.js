const navbarHeight=$('.navbar').height(),headerTitleOffsetTop=$('.header-title').offset().top,getQuienSoyOffset=()=>$('#quien-soy').offset().top,isNavbarInMain=()=>window.pageYOffset>=getQuienSoyOffset()-navbarHeight,shouldNavbarTurnBlack=()=>isNavbarInMain(),turnNavBarBlack=()=>$('.navbar').css('background-color','rgba(0, 0, 0, .8)'),turnNavBarWhite=()=>$('.navbar').css('background-color','transparent'),didHeaderTitleTouchNavbar=()=>headerTitleOffsetTop<$(window).scrollTop(),moveHeaderTitleToNavbar=()=>$('.header-title').addClass('title-in-navbar'),hideHeaderTitleFromNavbar=()=>$('.header-title').removeClass('title-in-navbar'),releaseLock=()=>setTimeout(()=>{checkScrollForNavbarLock=!1,handleScrollEvent()},2e3),isToggleNavVisible=()=>'none'!==$('.toggle-navigation').css('display'),handleToggleNavigationClick=()=>toggleNavbar(),isNavBarOpen=()=>'visible'===$('.navbar ul').css('visibility'),handleTitleInNavbar=()=>{didHeaderTitleTouchNavbar()?moveHeaderTitleToNavbar():hideHeaderTitleFromNavbar()};let checkScrollForNavbarLock=!1,navbarIsBlack=!1;const handleScrollEvent=()=>{if(handleTitleInNavbar(),!checkScrollForNavbarLock){const a=shouldNavbarTurnBlack();!navbarIsBlack&&a?(turnNavBarBlack(),navbarIsBlack=!0,checkScrollForNavbarLock=!0):navbarIsBlack&&!a&&(turnNavBarWhite(),navbarIsBlack=!1,checkScrollForNavbarLock=!0),releaseLock()}},scrollPage=(a)=>{$('body, html').animate({scrollTop:a},400)},animateSectionTitle=(a)=>{const b=$(`#${a} > .section-title`).parent().is('section:odd')?'white':'black';$(`#${a} > .section-title`).css('transition','none'),$(`#${a} > .section-title`).css('color','orangered'),setTimeout(()=>{$(`#${a} > .section-title`).css('transition','color 1s ease'),$(`#${a} > .section-title`).css('color',b)},1e3)},hideNavbar=()=>{$('.navbar ul').css('visibility','hidden'),$('.toggle-navigation').removeClass('open')},showNavbar=()=>{$('.navbar ul').css('visibility','visible'),$('.toggle-navigation').addClass('open')},hideNavbarIfToggleIsVisible=()=>{isToggleNavVisible()&&hideNavbar()},toggleNavbar=()=>{isNavBarOpen()?hideNavbar():showNavbar()},handleSectionClick=(a)=>{a.preventDefault();let b=a.target.href.split('#').pop();b?(scrollPage($(`#${b}`).offset().top-navbarHeight),animateSectionTitle(b)):scrollPage(0),handleScrollEvent(),hideNavbarIfToggleIsVisible()},handleWindowResize=()=>{isToggleNavVisible()?hideNavbar():showNavbar()};$(document).scroll(handleScrollEvent),$(window).resize(handleWindowResize),$('.title-in-navbar').click(handleToggleNavigationClick);