  jQuery.fn.getdate = function (options) {

    var settings = jQuery.extend({
      format : 'days',
      element : 'time',
      attribute : 'data-interval'
    }, options);

    function getDateDiff(dateF, dateL) {
      // Return difference in days;
      if(settings.format === 'years')      var divider = 31536000000;
      else if(settings.format === 'month') divider = 2592000000;
      else if(settings.format === 'days')  divider = 86400000;
      else if(settings.format === 'hours') divider = 3600000;

      var diff = Math.round(((Date.parse(dateF) - Date.parse(dateL)) / divider));

      if (diff > 0) {
        return diff + ' ' + settings.format;
      } else if (diff === 0 || diff === 1) {
        return 'one ' + settings.format.replace('s', '');
      } else {
        return '<p class="text-error">incorrect date: (' + diff + ' ' + settings.format + ')</p>';
      }
    }

    function datePartFormat(datesArr, field) {
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

    jQuery.each(jQuery(this).find(jQuery(settings.element)), function() {
      var datesArr = jQuery(this).attr(settings.attribute)
                            .replace(/-/g,"/")
                            .replace(/[T]/g,"/")
                            .replace(/[Z]/g,"")
                            .split(',');

      return jQuery(this).html(getFullDate(datesArr));
    });
  }
