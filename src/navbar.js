/* global $ */

const getNavbarHeight = () => $('.navbar').height()

const getQuienSoyOffset = () => $('#quien-soy').offset().top

const isNavbarInMain = () => (window.pageYOffset >= (getQuienSoyOffset() - getNavbarHeight()))

const shouldNavbarTurnBlack = () => isNavbarInMain()

const turnNavBarBlack = () => $('.navbar').css('background-color', 'rgba(0, 0, 0, .8)')

const turnNavBarWhite = () => $('.navbar').css('background-color', 'transparent')

const releaseLock = () => {
  setTimeout(() => {
    scrollLock = false
    handleScrollEvent()
  }, 2000)
}

let scrollLock = false
let navbarIsBlack = false
const handleScrollEvent = () => {
  if (scrollLock) return
  const shouldTurnBlack = shouldNavbarTurnBlack()
  if (!navbarIsBlack && shouldTurnBlack) {
    turnNavBarBlack()
    navbarIsBlack = true
    scrollLock = true
  } else if (navbarIsBlack && !shouldTurnBlack) {
    turnNavBarWhite()
    navbarIsBlack = false
    scrollLock = true
  }
  releaseLock()
}

const scrollPage = offset => {
  $('body, html').animate({
    scrollTop: offset
  }, 400)
}

const animateSectionTitle = (section) => {
  const color = $(`#${section} > .section-title`).parent().is('section:odd') ? 'white' : 'black'
  $(`#${section} > .section-title`).css('transition', 'none')
  $(`#${section} > .section-title`).css('color', 'orangered')
  setTimeout(() => {
    $(`#${section} > .section-title`).css('transition', 'color 1s ease')
    $(`#${section} > .section-title`).css('color', color)
  }, 1000)
}

const isToggleNavVisible = () => ($('.toggle-navigation').css('display') !== 'none')

const hideNavbar = () => {
  $('.navbar ul').css('visibility', 'hidden')
  $('.toggle-navigation').removeClass('open')
}

const showNavbar = () => {
  $('.navbar ul').css('visibility', 'visible')
  $('.toggle-navigation').addClass('open')
}

const hideNavbarIfToggleIsVisible = () => {
  if (isToggleNavVisible()) {
    hideNavbar()
  }
}

const isNavBarOpen = () => ($('.navbar ul').css('visibility') === 'visible')

const toggleNavbar = () => {
  if (isNavBarOpen()) {
    hideNavbar()
  } else {
    showNavbar()
  }
}

const handleSectionClick = event => {
  event.preventDefault()
  let sectionToGo = event.target.href.split('#').pop()
  if (sectionToGo) {
    scrollPage($(`#${sectionToGo}`).offset().top - getNavbarHeight())
    animateSectionTitle(sectionToGo)
  } else {
    scrollPage(0)
  }
  handleScrollEvent()
  hideNavbarIfToggleIsVisible()
}

const handleWindowResize = event => {
  if (!isToggleNavVisible()) {
    showNavbar()
  } else {
    hideNavbar()
  }
}

const handleToggleNavigationClick = event => toggleNavbar()

$(document).scroll(handleScrollEvent)
$(window).resize(handleWindowResize)
$('.navbar a').click(handleSectionClick)
$('.toggle-navigation').click(handleToggleNavigationClick)
