'use strict';

/* global $ */

var getNavbarHeight = function getNavbarHeight() {
  return $('.navbar').height();
};

var getQuienSoyOffset = function getQuienSoyOffset() {
  return $('#quien-soy').offset().top;
};

var isNavbarInMain = function isNavbarInMain() {
  return window.pageYOffset >= getQuienSoyOffset() - getNavbarHeight();
};

var shouldNavbarTurnBlack = function shouldNavbarTurnBlack() {
  return isNavbarInMain();
};

var turnNavBarBlack = function turnNavBarBlack() {
  return $('.navbar').css('background-color', 'rgba(0, 0, 0, .8)');
};

var turnNavBarWhite = function turnNavBarWhite() {
  return $('.navbar').css('background-color', 'transparent');
};

var releaseLock = function releaseLock() {
  setTimeout(function () {
    scrollLock = false;
    handleScrollEvent();
  }, 2000);
};

var scrollLock = false;
var navbarIsBlack = false;
var handleScrollEvent = function handleScrollEvent() {
  if (scrollLock) return;
  var shouldTurnBlack = shouldNavbarTurnBlack();
  if (!navbarIsBlack && shouldTurnBlack) {
    turnNavBarBlack();
    navbarIsBlack = true;
    scrollLock = true;
  } else if (navbarIsBlack && !shouldTurnBlack) {
    turnNavBarWhite();
    navbarIsBlack = false;
    scrollLock = true;
  }
  releaseLock();
};

var scrollPage = function scrollPage(offset) {
  $('body, html').animate({
    scrollTop: offset
  }, 400);
};

var animateSectionTitle = function animateSectionTitle(section) {
  var color = $('#' + section + ' > .section-title').parent().is('section:odd') ? 'white' : 'black';
  $('#' + section + ' > .section-title').css('transition', 'none');
  $('#' + section + ' > .section-title').css('color', 'orangered');
  setTimeout(function () {
    $('#' + section + ' > .section-title').css('transition', 'color 1s ease');
    $('#' + section + ' > .section-title').css('color', color);
  }, 1000);
};

var isToggleNavVisible = function isToggleNavVisible() {
  return $('.toggle-navigation').css('display') !== 'none';
};

var hideNavbar = function hideNavbar() {
  $('.navbar ul').css('visibility', 'hidden');
  $('.toggle-navigation').removeClass('open');
};

var showNavbar = function showNavbar() {
  $('.navbar ul').css('visibility', 'visible');
  $('.toggle-navigation').addClass('open');
};

var hideNavbarIfToggleIsVisible = function hideNavbarIfToggleIsVisible() {
  if (isToggleNavVisible()) {
    hideNavbar();
  }
};

var isNavBarOpen = function isNavBarOpen() {
  return $('.navbar ul').css('visibility') === 'visible';
};

var toggleNavbar = function toggleNavbar() {
  if (isNavBarOpen()) {
    hideNavbar();
  } else {
    showNavbar();
  }
};

var handleSectionClick = function handleSectionClick(event) {
  event.preventDefault();
  var sectionToGo = event.target.href.split('#').pop();
  if (sectionToGo) {
    scrollPage($('#' + sectionToGo).offset().top - getNavbarHeight());
    animateSectionTitle(sectionToGo);
  } else {
    scrollPage(0);
  }
  handleScrollEvent();
  hideNavbarIfToggleIsVisible();
};

var handleWindowResize = function handleWindowResize(event) {
  if (!isToggleNavVisible()) {
    showNavbar();
  } else {
    hideNavbar();
  }
};

var handleToggleNavigationClick = function handleToggleNavigationClick(event) {
  return toggleNavbar();
};

$(document).scroll(handleScrollEvent);
$(window).resize(handleWindowResize);
$('.navbar a').click(handleSectionClick);
$('.toggle-navigation').click(handleToggleNavigationClick);