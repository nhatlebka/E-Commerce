import { Injectable } from '@nestjs/common';
import * as Canvas from 'canvas';
import * as JsBarcode from 'jsbarcode';

@Injectable()
export class BarCodeService {
  async generateBarCode(value: string) {
    const canvas = new Canvas.Canvas(100, 100, 'image');
    JsBarcode(canvas)
      .EAN13(value, { fontSize: 18, textMargin: 0, width: 2, height: 100 })
      .render();

    return canvas.toDataURL();
  }
}
