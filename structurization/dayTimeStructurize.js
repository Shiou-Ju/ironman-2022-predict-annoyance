const { convertArrayToCSV } = require('convert-array-to-csv');
const fs = require('fs');

const arr = [
  '21.21 Mon',
  '20.50 Tue',
  '21.46 Wed',
  '20.49 Thu',
  '20.56 Wed',
  '21.24 Thu',
  '21.26 Fri',
  '20.32 Wed',
  '21.04 Tue',
  '20.44 Wed',
  '20.54 Thu',
  '21.16 fri',
  '20.37 Mon',
  '21.07 Mon',
  '21.13 Tue',
  '21.23 Wed',
  '20.45 Fri',
  '20.59 Tue',
  '20.58 Thu',
  '20.53 Mon',
  '21.19 Wed',
  '21.21 Thu',
  '21.43 Fri',
  '21.06 Mon',
  '20.57 Tue',
  '21.20 Thu',
  '21.13 Fri 要關之前會有鎖聲',
  '20.59 Tue 要關之前會有鎖聲',
  '20.24 Wed',
  '20.54. 0726 mon',
  '21.00 0727 tue',
  '21.39 0728 wed',
  '21.15 0802 Mon',
  '21.27 0803 Tue',
  '21.11 0804 wed',
  '21.09 0805 Thr',
  '21.07 0809. mon',
  '21.18 0813. Fri',
  '21.14 0816. Mon',
  '21.05 0817. Tue',
  '21.12 08.18',
  '21.06 08.19',
  '21.11 0823 mon',
  '21.15 0824. tue',
  '20.38 0825. Wed.',
  '21.30 0826. Thu',
  '22.00 0826. Thu',
  '21.16. 0827 Fri',
  '21.37 0830 mon',
  '21.16 0831 Tue',
  '21.02 0901 Wed',
  '21.00 0909 Thu',
  '21.07 0910 Fri',
  '21.37. 0913 Mon',
  '21.25 0914 Tue',
  '20.59 = 0915 Wed',
  '21.17 0916 Thu',
  '21.16. 0917. Fri',
  '21.26 0927 mon',
  '21.24 0928 Tue',
  '21.00. 0929. wed',
  '21.21 0930. Thur',
  '21.27 1001 Fri',
  '20.53. 1004. Mon',
  '20.56 1005. tue',
  '20.52. 1006 wed',
  '21.04. 1007. thur',
  '21.16. 1012 Tue',
  '21.34 1015 Fri',
  '21.05 1019. tue',
  '20.51 1025 mon',
  '21.34 1026 tue',
  '21.14 1027. wed',
  '21.37. 1028. thu.',
  '21.00 11.02 Wed.',
  '21.00 11.16. Tue',
  '20.50. 11.17 wed',
  '20.46. 11/23 Tue',
  '21.14 11/24 low wed',
  '21.00 12/1 wed',
  '21.14. 12/7. tue',
  '21.16 12/9 wed',
  '21.03. 12/13. Mon',
  '21.08. 12/14 tue',
  '21.12 12/27 mon',
  '21.08. 12/29 wed',
  '21.09 1/11 Tue',
  '12.52 1/12. Wed',
  '21.30. 1/12. Wed',
  '21.04 1/13 Thu',
  '21.32 1.18 tue',
  '21.11. 1.24. Mon',
  '21.26 1.25 tue',
  '13.02. 1.26. Wed',
  '20.48. 2.7. Mon',
  '21.22 2.16. Wed',
  '21.14. 2.18. Fri',
  '21.29 2.21. mon',
  '21.36 2.22 tue',
  '21.18. 2.25. Fri',
  '21.14. 3.1. Tue',
  '21.06. 3/4 Fri',
  '21.52 3/17 Thu',
  '20.53. 3/22 Tue',
  '21.01. 03/29. tue',
  '21.35. 03/30. Wed',
  '21.07. 03/31. thu',
  '21.09. 04/01. Fri',
  '20.51. 04.06. Wed',
  '21.41. 04.15. fri',
  '21.15 04.18 mon',
  '21.07. 04.20. Wed',
  '21.26. 04.27. Wed',
  '21.14 0502. Mon',
  '21.14. 0503. tue',
  '21.08 05.04 wed',
  '21.08. 05.05 thu much less than yesterday',
  '21.09 05.11 wed',
  '21.14 05.12. Thur',
  '21.23 05.19. Thu',
  '21.52 05.25 Wed',
  '21.47. 0530. Mon',
  '21.29. 0531. Tue',
  '21.04 0606 Mon',
  '21.04. 0608. Wed',
  '21.18. 0613. Mon',
  '21.35. 0614 Tue',
  '21.30 wed.',
  '22.21 0704 mon',
  '21.00 0707 thu',
  '21.08. 0711 mon',
  '21.15. 0720. Wed',
  '21.01. 0726. Tue',
  '21.17 0802 tue',
  '21.27 0805 fri',
  '21.23. 0808. Mon',
  '21.15. 0809. tue.',
  '09.46. 0811. Thu',
  '20.57 08.11 thur',
  '13.05 08.12 fri',
  '20.49. 0816. Tue',
  '21.05 0818 thu',
  '20.45. 0825. Thu',
  '20.53. 0829. Mon.',
  '12.00. 08.30. Tue',
  '21.02 0908 thu',
  '09.43 0919 mon',
  '21.23. 0920. Tue',
];

/**
 * 能順利被處理的資料
 */
const formattedData = [];

/**
 * 有例外的資料
 * 因為量級的關係，為了幾筆特例寫判斷式是不符合效益的，寧願做為例外整筆被輸出，後續再進行手動更改
 */
const exceptions = [];

/**
 * csv 檔的 header
 */
const csvHeader = ['具體時間', '日期', '星期幾', '備註'];

/**
 * 主流程
 * 預計處理三件事：
 * 1. 移除多餘的英文句號並加上時間的分隔符號
 * 2. 判斷每筆資料是否符合資料預期的形態。
 *  - 若是，歸類為能被處理的資料。
 *  - 若否，歸類為例外，後續手動調整
 * 3. 將正常處理以及例外的資料轉成 csv 檔
 */
const main = () => {
  for (const str of arr) {
    // step 1
    const newStr = removeExtraPeriod(str);

    /**
     * 以空格作為分隔點，將字串切割成 array 方便後續處理
     */
    const splittedStrArr = newStr.split(' ');

    // step 2 後續處理並歸類到正確的分類
    processSplittedStr(splittedStrArr);
  }

  // step 3 轉成 csv 檔

  const csv = convertArrayToCSV(formattedData, {
    header: csvHeader,
    separator: ',',
  });

  fs.writeFileSync('annoyance_output.csv', csv);

  console.log(`===exceptions=== count: ${exceptions.length}`);
  console.log(exceptions);
  console.log(`===successes=== count: ${formattedData.length}`);
  console.log(formattedData);
};

/**
 * 移除多餘的英文句號並加上時間的分隔符號
 * @param {string} originalStr
 * @returns {string}
 */
const removeExtraPeriod = (originalStr) => {
  // 移除特定字串特定符號但保留前幾個的參考資料
  // https://stackoverflow.com/questions/36502182/how-to-remove-all-but-the-first-occurences-of-a-character-from-a-string

  /**
   * 因為只有第一組時間需要一個分隔符號，所以我們採取反向的做法：亦即將所有英文的句號移除後，再把每串 string index = 1 的位置後面加上一個英文的冒號「:」。
   */
  let newStr = originalStr.replace(/\./g, '');

  /**
   * 時間加上冒號以後的字串
   */
  newStr = `${newStr.slice(0, 2)}:${newStr.slice(2)}`;

  return newStr;
};

/**
 * 處理並判斷是否分割後的字串陣列符合我們想要的格式
 * 如果符合，依照格式 push 到 formattedData
 * 如果不符合，將原始資料 push 到 exceptions
 * @param {string[]} splittedStrArr
 * @returns {void}
 */
const processSplittedStr = (splittedStrArr) => {
  const cloneSplittedStrArr = [...splittedStrArr];
  const temp = [];

  // step 1 判斷小時分鐘
  // time format ref
  // https://stackoverflow.com/questions/7536755/regular-expression-for-matching-hhmm-time-format
  const validTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  const time = splittedStrArr[0];
  const isValidTime = validTimeRegex.test(time);

  if (isValidTime) {
    temp.push(time);
    splittedStrArr = splittedStrArr.filter((element) => element !== time);
  } else {
    exceptions.push(cloneSplittedStrArr);
    return;
  }

  // step 2 判斷日期

  // optional slash ref: https://stackoverflow.com/questions/8917209/regex-match-for-optional-trailing-slash
  // match multiple digits ref: https://stackoverflow.com/questions/12011792/regular-expression-matching-a-3-or-4-digit-cvv-of-a-credit-card

  const validDateRegex = /^[0-9]{0,2}\/?[0-9]{0,2}$/;
  const [date] = splittedStrArr.filter((str) => validDateRegex.test(str));

  if (!!date) {
    // 移除字串中的斜線
    const formattedDate = date.replace('/', '');
    temp.push(formattedDate);
    splittedStrArr = splittedStrArr.filter((element) => element !== date);
  } else {
    exceptions.push(cloneSplittedStrArr);
    return;
  }

  // step 3 判斷星期幾

  // non-capturing group
  //   https://stackoverflow.com/questions/3512471/what-is-a-non-capturing-group-in-regular-expressions
  // regex for weekdays (case insensitive)
  //   https://stackoverflow.com/questions/23962063/how-to-get-rid-of-all-weekday-words-from-a-string
  const validCaseInsensitiveWeekDayRegex =
    /(?:sat|sun|mon|tue|wed|thu|fri)\s?/gi;
  const [weekday] = splittedStrArr.filter((str) =>
    validCaseInsensitiveWeekDayRegex.test(str)
  );

  if (!!weekday) {
    // 統一成全部小寫
    const formattedWeekday = weekday.toLowerCase();
    // TODO: 限定只有三位數，避免 thu 寫成 thur 仍會通過
    temp.push(formattedWeekday);
    splittedStrArr = splittedStrArr.filter((element) => element !== weekday);
  } else {
    exceptions.push(cloneSplittedStrArr);
    return;
  }

  // step 4 將剩餘的字串變成「備註」
  if (splittedStrArr.length > 0) {
    // 中間插入空格
    const comment = splittedStrArr.join(' ');
    temp.push(comment);
  }

  formattedData.push(temp);
};

main();
