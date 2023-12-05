const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https://twitter.com/i/flow/login');


  const inputUsernameSelector = 'input[name="text"]';
  const inputPasswordSelector = 'input[type="password"]';

  const username = 'hoangle802';
  const password = 'Hyephan997';

  await page.waitForSelector(inputUsernameSelector);
  await page.type(inputUsernameSelector, username, { delay: 100 });

  const nextButtonText = 'Next';

  await page.evaluate((nextButtonText) => {
    const buttons = Array.from(document.querySelectorAll('div[role="button"] span'));
    const nextButton = buttons.find(button => button.innerText.includes(nextButtonText));

    if (nextButton) {
      nextButton.click();
    }
  }, nextButtonText);

  await page.waitForSelector(inputPasswordSelector);
  await page.type(inputPasswordSelector, password, { delay: 100 });

  const loginButtonSelector = 'div[role="button"][data-testid="LoginForm_Login_Button"]';

  await page.waitForSelector(loginButtonSelector);
  await page.click(loginButtonSelector);

  await page.waitForTimeout(3000); // 3000 milliseconds (3 seconds), bạn có thể điều chỉnh thời gian chờ này

  // Chuyển hướng đến đường dẫn cụ thể
  const specificPath = 'https://twitter.com/bachkhoabnb/status/1726939602261528913?fbclid=IwAR2jj3fBUbJsmO1LXpt9Kr9WCj38qls-_nJOIYKxuw0__Kp-Faop-zx3zpo';
  await page.goto(specificPath);

  setTimeout(async () => {
    await autoScroll(page, browser);
  }, 2000)

  // Đóng trình duyệt
  // await browser.close();
})();

async function autoScroll(page, browser) {
  await page.evaluate(async () => {
    // Hàm này thực hiện scroll xuống đáy trang web từ từ
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 300;
      var timer = setInterval(async () => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        // window.open('https://twitter.com/AliKAfridi/status/1728928715898273996', '_blank');
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 2000); // Thay đổi giá trị của setTimeout nếu bạn muốn scroll nhanh hoặc chậm hơn
    });
  });
}
