# Button 按钮

<script>
    import AButton from '@/components/button/button.vue';
    
    export default {
        components: { AButton },
        data () {
            return {
                isLoading: false
            }
        }
    }
</script>

<style>
    .box {
        margin-bottom: 24px;
        button {
            margin-right: 24px;
        }
    }
</style>

## 基本使用

<div class="box">
    <a-button>默认主题</a-button>
    <a-button theme="primary">主要按钮</a-button>
    <a-button theme="success">成功按钮</a-button>
    <a-button theme="warning">警告按钮</a-button>
    <a-button theme="danger">危险按钮</a-button>
</div>

<div class="box">
    <a-button :loading="isLoading" loadingText="加载中" @click="isLoading = !isLoading">点击加载</a-button>
    <a-button theme="primary" :loading="isLoading" @click="isLoading = !isLoading">主要按钮</a-button>
    <a-button theme="success" :loading="isLoading" @click="isLoading = !isLoading">成功按钮</a-button>
    <a-button theme="warning" :loading="isLoading" @click="isLoading = !isLoading">警告按钮</a-button>
    <a-button theme="danger" :loading="isLoading" @click="isLoading = !isLoading">危险按钮</a-button>
</div>

<div class="box">
    <a-button disabled>禁用状态</a-button>
    <a-button theme="primary" disabled>主要按钮</a-button>
    <a-button theme="success" disabled>成功按钮</a-button>
    <a-button theme="warning" disabled>警告按钮</a-button>
    <a-button theme="danger" disabled>危险按钮</a-button>
</div>

<div class="box">
    <a-button round>圆角按钮</a-button>
    <a-button theme="primary" round>主要按钮</a-button>
    <a-button theme="success" round>成功按钮</a-button>
    <a-button theme="warning" round>警告按钮</a-button>
    <a-button theme="danger" round>危险按钮</a-button>
</div>

<div class="box">
    <a-button icon="setting"></a-button>
    <a-button icon="setting">左边</a-button>
    <a-button icon-right="setting" theme="primary">右边</a-button>
    <a-button icon="setting" round theme="success"></a-button>
    <a-button icon="setting" round theme="warning">左边</a-button>
    <a-button icon-right="setting" round theme="danger">右边</a-button>
</div>
