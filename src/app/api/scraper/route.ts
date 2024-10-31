import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

export async function POST() {
  await chromium.font(
    "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
  );

  const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;
  const path = await chromium.executablePath(
    "/app/node_modules/@sparticuz/chromium"
  );
  console.log("path:", path);

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(path),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://spacejelly.dev");
  const pageTitle = await page.title();
  await browser.close();

  return Response.json({
    test: pageTitle,
  });

  /*let browser;

  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.amazon.com");

    const pageTitle = await page.title();

    return Response.json({ test: pageTitle });
  } catch (error: any) {
    return Response.json(
      { error: `An error occurred: ${error.message}` },
      { status: 200 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }*/
}
