amis.define('src/renderers/Form/ChartRadios.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RadiosControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const helper_1 = require("src/utils/helper.ts");
  let ChartRadiosControl = /** @class */ (() => {
      class ChartRadiosControl extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.highlightIndex = -1;
              this.prevIndex = -1;
          }
          chartRef(chart) {
              var _a;
              this.chart = chart;
              (_a = this.chart) === null || _a === void 0 ? void 0 : _a.on('click', 'series', (params) => {
                  this.props.onToggle(this.props.options[params.dataIndex]);
              });
              // 因为会要先 setOptions 再来。
              setTimeout(() => this.highlight());
          }
          highlight(index = this.highlightIndex) {
              this.highlightIndex = index;
              if (!this.chart || this.prevIndex === index) {
                  return;
              }
              if (~this.prevIndex) {
                  this.chart.dispatchAction({
                      type: 'downplay',
                      seriesIndex: 0,
                      dataIndex: this.prevIndex
                  });
              }
              if (~index) {
                  this.chart.dispatchAction({
                      type: 'highlight',
                      seriesIndex: 0,
                      dataIndex: index
                  });
                  // 显示 tooltip
                  if (this.props.showTooltipOnHighlight) {
                      this.chart.dispatchAction({
                          type: 'showTip',
                          seriesIndex: 0,
                          dataIndex: index
                      });
                  }
              }
              this.prevIndex = index;
          }
          compoonentDidMount() {
              if (this.props.selectedOptions.length) {
                  this.highlight(this.props.options.indexOf(this.props.selectedOptions[0]));
              }
          }
          componentDidUpdate() {
              if (this.props.selectedOptions.length) {
                  this.highlight(this.props.options.indexOf(this.props.selectedOptions[0]));
              }
          }
          render() {
              const { options, labelField, chartValueField, valueField, render } = this.props;
              const config = Object.assign(Object.assign({ legend: {
                      top: 10
                  }, tooltip: {
                      formatter: (params) => `${params.name}：${params.value[chartValueField || valueField || 'value']}（${params.percent}%）`
                  }, series: [
                      {
                          type: 'pie',
                          top: 30,
                          bottom: 0
                      }
                  ] }, this.props.config), { dataset: {
                      dimensions: [
                          labelField || 'label',
                          chartValueField || valueField || 'value'
                      ],
                      source: options
                  } });
              return render('chart', {
                  type: 'chart'
              }, {
                  config,
                  chartRef: this.chartRef
              });
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ChartRadiosControl.prototype, "chartRef", null);
      return ChartRadiosControl;
  })();
  exports.default = ChartRadiosControl;
  let RadiosControlRenderer = /** @class */ (() => {
      let RadiosControlRenderer = class RadiosControlRenderer extends ChartRadiosControl {
      };
      RadiosControlRenderer.defaultProps = {
          multiple: false
      };
      RadiosControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'chart-radios',
              sizeMutable: false
          })
      ], RadiosControlRenderer);
      return RadiosControlRenderer;
  })();
  exports.RadiosControlRenderer = RadiosControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnRSYWRpb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vQ2hhcnRSYWRpb3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFJMUIsdUNBS21CO0FBQ25CLCtDQUFxRDtBQXNCckQ7SUFBQSxNQUFxQixrQkFBbUIsU0FBUSxlQUFLLENBQUMsU0FHckQ7UUFIRDs7WUFJRSxtQkFBYyxHQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVCLGNBQVMsR0FBVyxDQUFDLENBQUMsQ0FBQztRQTRHekIsQ0FBQztRQXhHQyxRQUFRLENBQUMsS0FBVzs7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFFbkIsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFO2dCQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1RCxDQUFDLEVBQUU7WUFFSCx1QkFBdUI7WUFDdkIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxTQUFTLENBQUMsUUFBZ0IsSUFBSSxDQUFDLGNBQWM7WUFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFFNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7Z0JBQzNDLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FB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

});
