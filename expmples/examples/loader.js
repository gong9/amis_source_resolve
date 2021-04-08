amis.define('examples/loader.ts', function(require, exports, module, define) {

  const __moduleId = (str) => '';
  const mapping = {
      'jquery': 'node_modules/jquery/dist/jquery',
      'react': 'node_modules/react/index',
      'react-dom': 'node_modules/react-dom/index',
      'immutability-helper': 'node_modules/immutability-helper/index',
      'react-cropper': 'node_modules/react-cropper/dist/react-cropper',
      'react-dropzone': 'node_modules/react-dropzone/dist/index',
      'classnames': 'node_modules/classnames/index',
      'axios': 'node_modules/axios/index',
      'exceljs': 'node_modules/exceljs/dist/exceljs.min',
      'moment': 'node_modules/moment/moment',
      'mobx': 'node_modules/mobx/lib/index',
      'mobx-state-tree': 'node_modules/mobx-state-tree/dist/mobx-state-tree',
      'react-transition-group': 'node_modules/react-transition-group/index',
      'papaparse': 'node_modules/papaparse/papaparse.min',
      'echarts': 'node_modules/echarts/index',
      'zrender': 'node_modules/zrender/index',
      'sortablejs': 'node_modules/sortablejs/Sortable',
      'amis': 'src/index.tsx',
      'amis/embed': 'examples/embed.tsx',
      'prop-types': 'node_modules/prop-types/index',
      'async/mapLimit': 'node_modules/async/mapLimit',
      'qs': 'node_modules/qs/lib/index',
      'path-to-regexp': 'node_modules/path-to-regexp/dist/index'
  };
  function amisRequire(...args) {
      let id = args.shift();
      id = Array.isArray(id) ? id.map(id => mapping[id] || id) : mapping[id] || id;
      args.unshift(id);
      return amis.require.apply(this, args);
  }
  window.amisRequire = amisRequire;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvZXhhbXBsZXMvbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFFdkMsTUFBTSxPQUFPLEdBRVQ7SUFDRixRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztJQUM5QixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQztJQUM1QixXQUFXLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUNwQyxxQkFBcUIsRUFBRSxVQUFVLENBQUMscUJBQXFCLENBQUM7SUFDeEQsZUFBZSxFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUM7SUFDNUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDO0lBQzlDLFlBQVksRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDO0lBQ3RDLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDO0lBQzVCLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDO0lBQ2hDLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO0lBQzlCLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQzFCLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztJQUNoRCx3QkFBd0IsRUFBRSxVQUFVLENBQUMsd0JBQXdCLENBQUM7SUFDOUQsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUM7SUFDcEMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFDaEMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFDaEMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUM7SUFDdEMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7SUFDNUIsWUFBWSxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDdkMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUM7SUFDdEMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDO0lBQzlDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ3RCLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztDQUMvQyxDQUFDO0FBRUYsU0FBUyxXQUFXLENBQUMsR0FBRyxJQUFnQjtJQUN0QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEIsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUEsTUFBYyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMifQ==

});
