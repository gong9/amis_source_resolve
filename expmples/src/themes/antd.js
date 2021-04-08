amis.define('src/themes/antd.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const theme_1 = require("src/theme.tsx");
  theme_1.theme('antd', {
      classPrefix: 'antd-',
      components: {
          toast: {
              closeButton: true
          }
      },
      renderers: {
          'form': {
              horizontal: {
                  leftFixed: true
              }
          },
          'pagination': {
              maxButtons: 9,
              showPageInput: false
          },
          'fieldset': {
              collapsable: false
          },
          'remark': {
              placement: 'right'
          },
          'tabs': {
              mode: 'line'
          },
          'tabs-control': {
              mode: 'line'
          },
          'range-control': {
              showInput: true,
              clearable: true
          }
      }
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW50ZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy90aGVtZXMvYW50ZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUErQjtBQUUvQixhQUFLLENBQUMsTUFBTSxFQUFFO0lBQ1osV0FBVyxFQUFFLE9BQU87SUFDcEIsVUFBVSxFQUFFO1FBQ1YsS0FBSyxFQUFFO1lBQ0wsV0FBVyxFQUFFLElBQUk7U0FDbEI7S0FDRjtJQUVELFNBQVMsRUFBRTtRQUNULE1BQU0sRUFBRTtZQUNOLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUUsSUFBSTthQUNoQjtTQUNGO1FBRUQsWUFBWSxFQUFFO1lBQ1osVUFBVSxFQUFFLENBQUM7WUFDYixhQUFhLEVBQUUsS0FBSztTQUNyQjtRQUVELFVBQVUsRUFBRTtZQUNWLFdBQVcsRUFBRSxLQUFLO1NBQ25CO1FBRUQsUUFBUSxFQUFFO1lBQ1IsU0FBUyxFQUFFLE9BQU87U0FDbkI7UUFFRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTTtTQUNiO1FBRUQsY0FBYyxFQUFFO1lBQ2QsSUFBSSxFQUFFLE1BQU07U0FDYjtRQUVELGVBQWUsRUFBRTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsU0FBUyxFQUFFLElBQUk7U0FDaEI7S0FDRjtDQUNGLENBQUMsQ0FBQyJ9

});
