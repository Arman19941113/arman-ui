# Loading 加载中

加载过渡动画。

## 整页加载
<a-button theme="default" @click="handle">两秒后关闭</a-button>
<a-loading :value="isLoading" global></a-loading>

## 加载类型
<div style="width: 400px;height: 120px;position: relative;display: flex;justify-content: space-around;align-items: center;border: 1px solid #DCDFE6;">
    <a-button @click="handle1">普通圆弧</a-button>
    <a-button @click="handle2">扩散圆圈</a-button>
    <a-button @click="handle3">四点旋转</a-button>
    <a-loading :value="isLoading1" type="linear"></a-loading>
    <a-loading :value="isLoading2" type="wave"></a-loading>
    <a-loading :value="isLoading3" type="dots"></a-loading>
</div>

<script>
    import { ref } from 'vue';
    import AButton from '@/components/button/button.vue';
    import ALoading from '@/components/loading/loading.vue';
    
    export default {
        components: { AButton, ALoading },
        setup () {
            const isLoading = ref(false);
            const isLoading1 = ref(false);
            const isLoading2 = ref(false);
            const isLoading3 = ref(false);
            
            return {
                isLoading,
                isLoading1,
                isLoading2,
                isLoading3,
                handle,
                handle1,
                handle2,
                handle3,
            }
        },
    };
    
    function handle () {
         this.isLoading = !this.isLoading;
         setTimeout(()=>{this.isLoading = false}, 2000)
    }
    function handle1 () {
         this.isLoading1 = !this.isLoading1;
         setTimeout(()=>{this.isLoading1 = false}, 2000)
    }
    function handle2 () {
         this.isLoading2 = !this.isLoading2;
         setTimeout(()=>{this.isLoading2 = false}, 2000)
    }
    function handle3 () {
         this.isLoading3 = !this.isLoading3;
         setTimeout(()=>{this.isLoading3 = false}, 2000)
    }
</script>

