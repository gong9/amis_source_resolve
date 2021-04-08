amis.define('src/themes/cxd.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const theme_1 = require("src/theme.tsx");
  // yunshe.design 百度云舍
  theme_1.theme('cxd', {
      classPrefix: 'cxd-',
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
          },
          'chart': {
              chartTheme: {
                  color: [
                      '#108cee',
                      '#545fc8',
                      '#f38900',
                      '#ea2e2e',
                      '#8a58bc',
                      '#04c1ba',
                      '#fbbe04',
                      '#5fb333',
                      '#0a7eb4',
                      '#304069',
                      '#c4ccd3'
                  ],
                  backgroundColor: '#ffffff',
                  textStyle: {},
                  title: {
                      textStyle: {
                          color: '#333'
                      },
                      subtextStyle: {
                          color: '#999999'
                      }
                  },
                  line: {
                      itemStyle: {
                          borderWidth: 1
                      },
                      lineStyle: {
                          width: 2
                      },
                      symbolSize: 4,
                      symbol: 'emptyCircle',
                      smooth: false
                  },
                  radar: {
                      itemStyle: {
                          borderWidth: 1
                      },
                      lineStyle: {
                          width: 2
                      },
                      symbolSize: 4,
                      symbol: 'emptyCircle',
                      smooth: false
                  },
                  bar: {
                      itemStyle: {
                          barBorderWidth: 0,
                          barBorderColor: '#ccc'
                      }
                  },
                  pie: {
                      itemStyle: {
                          borderWidth: 0,
                          borderColor: '#ccc'
                      }
                  },
                  scatter: {
                      itemStyle: {
                          borderWidth: 0,
                          borderColor: '#ccc'
                      }
                  },
                  boxplot: {
                      itemStyle: {
                          borderWidth: 0,
                          borderColor: '#ccc'
                      }
                  },
                  parallel: {
                      itemStyle: {
                          borderWidth: 0,
                          borderColor: '#ccc'
                      }
                  },
                  sankey: {
                      itemStyle: {
                          borderWidth: 0,
                          borderColor: '#ccc'
                      }
                  },
                  funnel: {
                      itemStyle: {
                          borderWidth: 0,
                          borderColor: '#ccc'
                      }
                  },
                  gauge: {
                      itemStyle: {
                          borderWidth: 0,
                          borderColor: '#ccc'
                      }
                  },
                  candlestick: {
                      itemStyle: {
                          color: '#c23531',
                          color0: '#314656',
                          borderColor: '#c23531',
                          borderColor0: '#314656',
                          borderWidth: 1
                      }
                  },
                  graph: {
                      itemStyle: {
                          borderWidth: 0,
                          borderColor: '#ccc'
                      },
                      lineStyle: {
                          width: 1,
                          color: '#aaa'
                      },
                      symbolSize: 4,
                      symbol: 'emptyCircle',
                      smooth: false,
                      color: [
                          '#108cee',
                          '#545fc8',
                          '#f38900',
                          '#ea2e2e',
                          '#8a58bc',
                          '#04c1ba',
                          '#fbbe04',
                          '#5fb333',
                          '#0a7eb4',
                          '#304069',
                          '#c4ccd3'
                      ],
                      label: {
                          color: '#f5f5f5'
                      }
                  },
                  map: {
                      itemStyle: {
                          normal: {
                              areaColor: '#eee',
                              borderColor: '#444',
                              borderWidth: 0.5
                          },
                          emphasis: {
                              areaColor: 'rgba(255,215,0,0.8)',
                              borderColor: '#444',
                              borderWidth: 1
                          }
                      },
                      label: {
                          normal: {
                              textStyle: {
                                  color: '#000'
                              }
                          },
                          emphasis: {
                              textStyle: {
                                  color: 'rgb(100,0,0)'
                              }
                          }
                      }
                  },
                  geo: {
                      itemStyle: {
                          normal: {
                              areaColor: '#eee',
                              borderColor: '#444',
                              borderWidth: 0.5
                          },
                          emphasis: {
                              areaColor: 'rgba(255,215,0,0.8)',
                              borderColor: '#444',
                              borderWidth: 1
                          }
                      },
                      label: {
                          normal: {
                              textStyle: {
                                  color: '#000'
                              }
                          },
                          emphasis: {
                              textStyle: {
                                  color: 'rgb(100,0,0)'
                              }
                          }
                      }
                  },
                  categoryAxis: {
                      axisLine: {
                          show: true,
                          lineStyle: {
                              color: '#999999'
                          }
                      },
                      axisTick: {
                          show: true,
                          lineStyle: {
                              color: '#999999'
                          }
                      },
                      axisLabel: {
                          show: true,
                          textStyle: {
                              color: '#999999'
                          }
                      },
                      splitLine: {
                          show: false,
                          lineStyle: {
                              color: ['#ccc']
                          }
                      },
                      splitArea: {
                          show: false,
                          areaStyle: {
                              color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                          }
                      }
                  },
                  valueAxis: {
                      axisLine: {
                          show: true,
                          lineStyle: {
                              color: '#999999'
                          }
                      },
                      axisTick: {
                          show: true,
                          lineStyle: {
                              color: '#999999'
                          }
                      },
                      axisLabel: {
                          show: true,
                          textStyle: {
                              color: '#999999'
                          }
                      },
                      splitLine: {
                          show: true,
                          lineStyle: {
                              color: ['#eeeeee']
                          }
                      },
                      splitArea: {
                          show: false,
                          areaStyle: {
                              color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                          }
                      }
                  },
                  logAxis: {
                      axisLine: {
                          show: true,
                          lineStyle: {
                              color: '#999999'
                          }
                      },
                      axisTick: {
                          show: true,
                          lineStyle: {
                              color: '#999999'
                          }
                      },
                      axisLabel: {
                          show: true,
                          textStyle: {
                              color: '#999999'
                          }
                      },
                      splitLine: {
                          show: true,
                          lineStyle: {
                              color: ['#eeeeee']
                          }
                      },
                      splitArea: {
                          show: false,
                          areaStyle: {
                              color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                          }
                      }
                  },
                  timeAxis: {
                      axisLine: {
                          show: true,
                          lineStyle: {
                              color: '#999999'
                          }
                      },
                      axisTick: {
                          show: true,
                          lineStyle: {
                              color: '#999999'
                          }
                      },
                      axisLabel: {
                          show: true,
                          textStyle: {
                              color: '#999999'
                          }
                      },
                      splitLine: {
                          show: true,
                          lineStyle: {
                              color: ['#eeeeee']
                          }
                      },
                      splitArea: {
                          show: false,
                          areaStyle: {
                              color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                          }
                      }
                  },
                  toolbox: {
                      iconStyle: {
                          normal: {
                              borderColor: '#999'
                          },
                          emphasis: {
                              borderColor: '#666'
                          }
                      }
                  },
                  legend: {
                      textStyle: {
                          color: '#333'
                      }
                  },
                  tooltip: {
                      axisPointer: {
                          lineStyle: {
                              color: '#ccc',
                              width: 1
                          },
                          crossStyle: {
                              color: '#ccc',
                              width: 1
                          }
                      }
                  },
                  timeline: {
                      lineStyle: {
                          color: '#293c55',
                          width: 1
                      },
                      itemStyle: {
                          normal: {
                              color: '#293c55',
                              borderWidth: 1
                          },
                          emphasis: {
                              color: '#a9334c'
                          }
                      },
                      controlStyle: {
                          normal: {
                              color: '#293c55',
                              borderColor: '#293c55',
                              borderWidth: 0.5
                          },
                          emphasis: {
                              color: '#293c55',
                              borderColor: '#293c55',
                              borderWidth: 0.5
                          }
                      },
                      checkpointStyle: {
                          color: '#e43c59',
                          borderColor: 'rgba(194,53,49, 0.5)'
                      },
                      label: {
                          normal: {
                              textStyle: {
                                  color: '#293c55'
                              }
                          },
                          emphasis: {
                              textStyle: {
                                  color: '#293c55'
                              }
                          }
                      }
                  },
                  visualMap: {
                      color: ['#bf444c', '#d88273', '#f6efa6']
                  },
                  dataZoom: {
                      backgroundColor: 'rgba(47,69,84,0)',
                      dataBackgroundColor: 'rgba(47,69,84,0.3)',
                      fillerColor: 'rgba(167,183,204,0.4)',
                      handleColor: '#a7b7cc',
                      handleSize: '100%',
                      textStyle: {
                          color: '#333'
                      }
                  },
                  markPoint: {
                      label: {
                          color: '#f5f5f5'
                      },
                      emphasis: {
                          label: {
                              color: '#f5f5f5'
                          }
                      }
                  }
              }
          }
      }
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3RoZW1lcy9jeGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBK0I7QUFFL0IscUJBQXFCO0FBQ3JCLGFBQUssQ0FBQyxLQUFLLEVBQUU7SUFDWCxXQUFXLEVBQUUsTUFBTTtJQUVuQixVQUFVLEVBQUU7UUFDVixLQUFLLEVBQUU7WUFDTCxXQUFXLEVBQUUsSUFBSTtTQUNsQjtLQUNGO0lBRUQsU0FBUyxFQUFFO1FBQ1QsTUFBTSxFQUFFO1lBQ04sVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxJQUFJO2FBQ2hCO1NBQ0Y7UUFFRCxZQUFZLEVBQUU7WUFDWixVQUFVLEVBQUUsQ0FBQztZQUNiLGFBQWEsRUFBRSxLQUFLO1NBQ3JCO1FBRUQsVUFBVSxFQUFFO1lBQ1YsV0FBVyxFQUFFLEtBQUs7U0FDbkI7UUFFRCxRQUFRLEVBQUU7WUFDUixTQUFTLEVBQUUsT0FBTztTQUNuQjtRQUVELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNO1NBQ2I7UUFFRCxjQUFjLEVBQUU7WUFDZCxJQUFJLEVBQUUsTUFBTTtTQUNiO1FBRUQsZUFBZSxFQUFFO1lBQ2YsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUVELE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUU7b0JBQ0wsU0FBUztvQkFDVCxTQUFTO29CQUNULFNBQVM7b0JBQ1QsU0FBUztvQkFDVCxTQUFTO29CQUNULFNBQVM7b0JBQ1QsU0FBUztvQkFDVCxTQUFTO29CQUNULFNBQVM7b0JBQ1QsU0FBUztvQkFDVCxTQUFTO2lCQUNWO2dCQUNELGVBQWUsRUFBRSxTQUFTO2dCQUMxQixTQUFTLEVBQUUsRUFBRTtnQkFDYixLQUFLLEVBQUU7b0JBQ0wsU0FBUyxFQUFFO3dCQUNULEtBQUss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

});
