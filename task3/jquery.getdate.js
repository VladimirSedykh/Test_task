  jQuery.fn.getdate = function () {

    function getDateDiff(dateF, dateL) {
      // Return difference in days;
      var divider = 86400000;
      var diff = Math.round(((Date.parse(dateF) - Date.parse(dateL)) / divider));

      if (diff > 0) {
        return diff + ' days';
      } else if (diff === 0 || diff === 1) {
        return 'one day';
      } else {
        return '<p class="text-error">incorrect date: (' + diff + ' days)</p>';
      }
    }

    function datePartFormat(datesArr, field){
      var datePart = {};
      datePart.all = (field === 'first') ? new Date(datesArr[0]) : new Date(datesArr[datesArr.length - 1]);
      datePart.year = datePart.all.format('yyyy');
      datePart.month = datePart.all.format('mmm');
      datePart.day = datePart.all.format('dd');
      return datePart;
    }

    function getAllDates(datesArr) {
      var date = {};
      date.first = datePartFormat(datesArr, 'first');
      date.last = datePartFormat(datesArr, 'last');
      date.length = getDateDiff(date.last.all, date.first.all);
      return date;
    }

    function getFullDate(datesArr) {
      var array  = datesArr,
          allDate = getAllDates(array),
          first  = allDate.first,
          last   = allDate.last,
          length = allDate.length,
          result = '';

      if (first.month !== last.month) {
        result = first.month + ' ' +
                 first.day + ' - ' +
                 last.month + ' ' +
                 last.day + ', ' +
                 length;
      }
      if (first.year !== last.year) {
        result = first.month + ' ' +
                 first.day + ' ' +
                 first.year + ' - ' +
                 last.month + ' ' +
                 last.day + ' ' +
                 last.year + ', ' +
                 length;
      }
      if (first.month === last.month && first.year === last.year) {
        result = first.month + ' ' +
                 first.day + ' - ' +
                 last.day + ', ' +
                 length;
      }
      if (first.day == last.day) {
        result = first.month + ' ' +
                 first.day + ', ' +
                 length;
      }

      return result;
    }

    jQuery.each(jQuery(this).find(jQuery("[data-interval]")), function() {
      var datesArr = jQuery(this).attr('data-interval')
                            .replace(/-/g,"/")
                            .replace(/[T]/g,"/")
                            .replace(/[Z]/g,"")
                            .split(',');

      return jQuery(this).html(getFullDate(datesArr));
    });
  }
