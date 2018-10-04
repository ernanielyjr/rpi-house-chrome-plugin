/*
// IMPROVE AND REMOVE COMMENT WRAPPER
$("#user_account_widget_bills_to_pay").appendTo(".grid-sortable.ui-sortable.last");
$("#user_account_widget_credit_cards_overview").appendTo(".grid-sortable.ui-sortable.first");


// wait for elements present
setTimeout(() => {
  $("ul.list-itens .zze-item .zze-component_box-group-links a").each(function () {
    var obj = $(this);
    var url = obj.attr("href");
    $.get(url, function(data) {
      console.log(data);
      var content = data.replace(/\sde\s20/gi, "/");
      content = $(content).find("table.simple-table");
      obj.closest('.zze-component_box-group').find('.zze-component_box-group-header').after(content);
    });
  });
}, 3000)
 */