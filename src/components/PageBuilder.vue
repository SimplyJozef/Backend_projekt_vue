<template>
  <div>
    <ckeditor
        v-model="editorData"
        :editor="editor"
    ></ckeditor>
    <div v-html="editorData"></div>
  </div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
    return {
      editorData: '<p>Initial content of the editor.</p>',
      editor: ClassicEditor
    };
  }
};
</script>
