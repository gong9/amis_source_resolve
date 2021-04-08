amis.define('src/components/condition-builder/config.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.OperationMap = void 0;
  exports.OperationMap = {
      equal: '等于',
      not_equal: '不等于',
      less: '小于',
      less_or_equal: '小于或等于',
      greater: '大于',
      greater_or_equal: '大于或等于',
      between: '属于范围',
      not_between: '不属于范围',
      is_empty: '为空',
      is_not_empty: '不为空',
      like: '模糊匹配',
      not_like: '不匹配',
      starts_with: '匹配开头',
      ends_with: '匹配结尾',
      select_equals: '等于',
      select_not_equals: '不等于',
      select_any_in: '包含',
      select_not_any_in: '不包含'
  };
  const defaultConfig = {
      valueTypes: ['value'],
      types: {
          text: {
              placeholder: '请输入文本',
              defaultOp: 'equal',
              operators: [
                  'equal',
                  'not_equal',
                  'is_empty',
                  'is_not_empty',
                  'like',
                  'not_like',
                  'starts_with',
                  'ends_with'
              ]
          },
          number: {
              operators: [
                  'equal',
                  'not_equal',
                  'less',
                  'less_or_equal',
                  'greater',
                  'greater_or_equal',
                  'between',
                  'not_between',
                  'is_empty',
                  'is_not_empty'
              ]
          },
          date: {
              operators: [
                  'equal',
                  'not_equal',
                  'less',
                  'less_or_equal',
                  'greater',
                  'greater_or_equal',
                  'between',
                  'not_between',
                  'is_empty',
                  'is_not_empty'
              ]
          },
          time: {
              operators: [
                  'equal',
                  'not_equal',
                  'less',
                  'less_or_equal',
                  'greater',
                  'greater_or_equal',
                  'between',
                  'not_between',
                  'is_empty',
                  'is_not_empty'
              ]
          },
          datetime: {
              operators: [
                  'equal',
                  'not_equal',
                  'less',
                  'less_or_equal',
                  'greater',
                  'greater_or_equal',
                  'between',
                  'not_between',
                  'is_empty',
                  'is_not_empty'
              ]
          },
          select: {
              operators: [
                  'select_equals',
                  'select_not_equals',
                  'select_any_in',
                  'select_not_any_in'
              ],
              valueTypes: ['value']
          },
          boolean: {
              operators: ['equal', 'not_equal']
          }
      }
  };
  exports.default = defaultConfig;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvY29uZGl0aW9uLWJ1aWxkZXIvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQW9CYSxRQUFBLFlBQVksR0FBRztJQUMxQixLQUFLLEVBQUUsSUFBSTtJQUNYLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLElBQUksRUFBRSxJQUFJO0lBQ1YsYUFBYSxFQUFFLE9BQU87SUFDdEIsT0FBTyxFQUFFLElBQUk7SUFDYixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsV0FBVyxFQUFFLE9BQU87SUFDcEIsUUFBUSxFQUFFLElBQUk7SUFDZCxZQUFZLEVBQUUsS0FBSztJQUNuQixJQUFJLEVBQUUsTUFBTTtJQUNaLFFBQVEsRUFBRSxLQUFLO0lBQ2YsV0FBVyxFQUFFLE1BQU07SUFDbkIsU0FBUyxFQUFFLE1BQU07SUFDakIsYUFBYSxFQUFFLElBQUk7SUFDbkIsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixhQUFhLEVBQUUsSUFBSTtJQUNuQixpQkFBaUIsRUFBRSxLQUFLO0NBQ3pCLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBVztJQUM1QixVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDckIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFFLE9BQU87WUFDcEIsU0FBUyxFQUFFLE9BQU87WUFDbEIsU0FBUyxFQUFFO2dCQUNULE9BQU87Z0JBQ1AsV0FBVztnQkFDWCxVQUFVO2dCQUNWLGNBQWM7Z0JBQ2QsTUFBTTtnQkFDTixVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsV0FBVzthQUNaO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixTQUFTLEVBQUU7Z0JBQ1QsT0FBTztnQkFDUCxXQUFXO2dCQUNYLE1BQU07Z0JBQ04sZUFBZTtnQkFDZixTQUFTO2dCQUNULGtCQUFrQjtnQkFDbEIsU0FBUztnQkFDVCxhQUFhO2dCQUNiLFVBQVU7Z0JBQ1YsY0FBYzthQUNmO1NBQ0Y7UUFDRCxJQUFJLEVBQUU7WUFDSixTQUFTLEVBQUU7Z0JBQ1QsT0FBTztnQkFDUCxXQUFXO2dCQUNYLE1BQU07Z0JBQ04sZUFBZTtnQkFDZixTQUFTO2dCQUNULGtCQUFrQjtnQkFDbEIsU0FBUztnQkFDVCxhQUFhO2dCQUNiLFVBQVU7Z0JBQ1YsY0FBYzthQUNmO1NBQ0Y7UUFFRCxJQUFJLEVBQUU7WUFDSixTQUFTLEVBQUU7Z0JBQ1QsT0FBTztnQkFDUCxXQUFXO2dCQUNYLE1BQU07Z0JBQ04sZUFBZTtnQkFDZixTQUFTO2dCQUNULGtCQUFrQjtnQkFDbEIsU0FBUztnQkFDVCxhQUFhO2dCQUNiLFVBQVU7Z0JBQ1YsY0FBYzthQUNmO1NBQ0Y7UUFFRCxRQUFRLEVBQUU7WUFDUixTQUFTLEVBQUU7Z0JBQ1QsT0FBTztnQkFDUCxXQUFXO2dCQUNYLE1BQU07Z0JBQ04sZUFBZTtnQkFDZixTQUFTO2dCQUNULGtCQUFrQjtnQkFDbEIsU0FBUztnQkFDVCxhQUFhO2dCQUNiLFVBQVU7Z0JBQ1YsY0FBYzthQUNmO1NBQ0Y7UUFFRCxNQUFNLEVBQUU7WUFDTixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZixtQkFBbUI7Z0JBQ25CLGVBQWU7Z0JBQ2YsbUJBQW1CO2FBQ3BCO1lBQ0QsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ3RCO1FBRUQsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztTQUNsQztLQUNGO0NBQ0YsQ0FBQztBQUNGLGtCQUFlLGFBQWEsQ0FBQyJ9

});
