import { Pipe, PipeTransform } from '@angular/core';
import { Cell, Geometry, Graph } from '@maxgraph/core';

@Pipe({
  standalone: true,
  name: 'getAttributeValuePipe'
})
export class GetAttributeValuePipe implements PipeTransform {

  transform(graph: Graph, attributeName, type: 'style' | any = 'style'): any {
    let result;
    const cell: Cell = graph.getSelectionCells()[0];
    if (cell) {
      if (type === 'style') {
        const style = cell.getStyle();
        if (style[attributeName]) {
          result = style[attributeName];
        } else {
          const geometry: Geometry = cell.getGeometry();
          result = geometry[attributeName];
        }
      }
    }
    return result;
  }

}
