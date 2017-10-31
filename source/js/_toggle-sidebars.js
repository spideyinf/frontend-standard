// Toggle the sidebar

$(function() {

  'use strict';
  let toggleSidebarBtn = $('.toggle-sidebar-btn .anticon');
  let toggleMessagesSidebarBtn = $('.toggle-messages-sidebar-btn .anticon');
  let windowWidth = $(window).width();

  //Change icon for toggle btns in responsive screens (tablet and down)
  if (windowWidth <= 991) {
    toggleSidebarBtn.toggleClass('icon-menufold icon-menuunfold');
    toggleMessagesSidebarBtn.toggleClass('icon-menufold icon-menuunfold');
  };

  $('.toggle-sidebar-btn, .off-sidebar-close-btn').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('off-toggle-sidebar-btn');
    $('.sidebar').toggleClass('off-sidebar');
    toggleSidebarBtn.toggleClass('icon-menufold icon-menuunfold');
  });

  $('.toggle-messages-sidebar-btn, .off-messages-sidebar-close-btn').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('off-toggle-message-sidebar-btn');
    $('.messages__sidebar').toggleClass('off-messages-sidebar');
    toggleMessagesSidebarBtn.toggleClass('icon-menufold icon-menuunfold');
  });

})
