<script setup lang="ts">
import { usePaymentStore } from '@/stores/payment';
import type { IPaymentForm } from '@/stores/types/payments';
import { Money } from '@element-plus/icons-vue';
import { ElDrawer } from 'element-plus';
import { computed, reactive, ref, watch } from 'vue';

const paymentStore = usePaymentStore();

interface IProps {
  modelValue: boolean;
  initialValues: IPaymentForm;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);

const form = reactive<IPaymentForm>(props.initialValues);
const drawerRef = ref<InstanceType<typeof ElDrawer>>();
const isLoading = ref(false);
const drawerTitle = computed(() => (form.id ? 'Edit payment' : 'Add payment'));
const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  }
});

watch(
  () => props.initialValues,
  (newValue) => {
    Object.assign(form, newValue);
  }
);

const onSave = async () => {
  isLoading.value = true;
  if (form.id) {
    await paymentStore.updatePayment(form);
  } else {
    await paymentStore.savePayment(form);
  }
  await paymentStore.loadPayments();
  isLoading.value = false;
  drawerRef.value!.close();
};

const handleClose = (done: () => void) => {
  if (isLoading.value) {
    return;
  }
  done();
};

const cancelForm = () => {
  dialog.value = false;
};
</script>

<template>
  <el-drawer ref="drawerRef" v-model="dialog" :title="drawerTitle" :before-close="handleClose" direction="ltr">
    <div class="demo-drawer__content" v-loading="isLoading">
      <el-form :model="form" label-width="80px">
        <el-form-item label="Description" size="large">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Amount" size="large">
          <el-input v-model="form.amount" autocomplete="off" :prefix-icon="Money">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">Cancel</el-button>
        <el-button type="primary" :loading="isLoading" @click="onSave">Submit</el-button>
      </div>
    </div>
  </el-drawer>
</template>
