//引入echarts的核心模块，提供核心接口
import * as echarts from 'echarts/core';

//引入雷达图
import {RadarChart} from 'echarts/charts';

//引入相关组件
import {
    TimelineComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components'

//引入特性
import { LabelLayout,UniversalTransition} from 'echarts/features';

//引入渲染器
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([
    TimelineComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    RadarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
])

export default echarts;

