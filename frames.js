//frameGroup组件


Vue.component('frames',{
    template: `<div ref="frameGroup">23</div>`,
    props:{
        params: [Object],
        frames: {
            type: Array,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        scrollEnabled: {
            type: Boolean,
            default: true,
        },
        index:{
            type: Number,
            default: 0,
        }
      },
    data: function () {
      return {
        title:Global.page.title,
        pad_top:0,
      }
    },
    mounted(){
        const rect = this.$refs.frameGroup.getBoundingClientRect();
        const {frames,name} = this;
        let FRAMES = this.params || {};
        let this_ = this;
        FRAMES.frames = [];
        for(let i=0;i<frames.length;i++){
            FRAMES.frames.push({
                bgColor: frames[i].bgColor||"#fff",
                bounces: frames[i].bounces||false,
                pageParam: frames[i].param,
                name: frames[i].urlName.indexOf('http')>-1?('out_link'+i): frames[i].urlName,
                url: frames[i].urlName.indexOf('http')>-1?frames[i].urlName: `./${frames[i].urlName}.html`,
            })
        }
        // alert(JSON.stringify(FRAMES.frames));
        FRAMES.scrollEnabled = this.scrollEnabled//是否可以滚动
        FRAMES.name = name//group的name
        FRAMES.rect = {
            x: rect.x,
            y: rect.y,
            w: rect.width,
            h: rect.height,
        }
        api.openFrameGroup(FRAMES, function (ret, err) {
            // alert(JSON.stringify(ret));
            this_.$emit('framesChange', ret, err);
            // this.$emit("update:index", index);
        })
    },
    methods: {
    },
    computed: {
    
    },
    watch: {
        index(index){
            const {name} = this;
            api.setFrameGroupIndex({
                name,
                index,
            });
        }
    },
})
