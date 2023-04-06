import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  getHello() {
    (async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      function delay(time) {
        return new Promise(function (resolve) {
          setTimeout(resolve, time);
        });
      }

      await page.setViewport({ width: 1366, height: 768 });
      console.log('iniciando');
      await page.goto('https://chillbet.net/', { waitUntil: 'networkidle0' });

      console.log('Clicar no botão "Entrar"');
      const buttonEntrar = await page.waitForSelector(
        '.Buttons__AuthButtonsContainer-sc-sy5hf7-11 > :first-child',
      );
      await buttonEntrar.click();

      await delay(2000);

      console.log('Preencher o formulário de login');
      await page.waitForSelector('input[name="email"]');
      await page.type('input[name="email"]', 'heliochillbet12@gmail.com');
      await page.type('input[name="password"]', 'huahuahua123');
      await delay(1000);
      const botaoEntrar = await page.$(
        'button.Buttons__GreenButton-sc-sy5hf7-6',
      );
      await botaoEntrar.click();
      await delay(1000);

      await page.goto('https://chillbet.net/games/tower');

      // Aguardar a atualização da página
      console.log('Aguardar a atualização da página');
      await delay(1000);

      // abrindo o select de moedas
      console.log('abrindo o select de moedas');
      await page.waitForSelector(
        '.WalletHeaderStyles__WalletHeaderContainer-sc-686n4u-1.gjrkOb',
      );
      const walletHeader = await page.$(
        '.WalletHeaderStyles__WalletHeaderContainer-sc-686n4u-1.gjrkOb',
      );
      await walletHeader.click();
      await delay(5000);

      //selecionando moeda
      console.log('selecionando moeda');
      await page.click(
        'div > div.HeaderStyles-sc-1fn5wm8-3.gabTKI > div.HeaderStyles__HeaderCenterStyled-sc-1fn5wm8-11.epHPTl > div.ProfileStyles__User-sc-c64nbl-2.cGgwfM > div > div > a > ul > div > div > div.rcs-inner-container > div > li:nth-child(10) > button > span.balance > span',
      );
      await delay(10000);

      //
      // abrindo o select de categoria
      console.log('abrindo o select de categoria');
      page.waitForNavigation();
      const categoria = await page.waitForSelector(
        '#root > div > div > div.sc-qRumB.hxkYNG > div > div.sc-jfSnVq.sc-dxroEu.kQGmIa.fnFXkp > div.sc-UxxwN.gAnoEt > div > div.sc-jhSXcr.dXjnKX > div',
        { hidden: true },
      );
      categoria.click();

      // await page.click(
      //   'document.querySelector("#root > div > div > div.sc-qRumB.hxkYNG > div > div.sc-jfSnVq.sc-dxroEu.kQGmIa.fnFXkp > div.sc-UxxwN.gAnoEt > div > div.sc-jhSXcr.dXjnKX > div")',
      // );

      await delay(5000);

      //selecionando categoria
      console.log('selecionando categoria');
      await page.click('.HeaderStyles-sc-1fn5wm8-3.gabTKI');
      await delay(5000);
    })();
  }
}
