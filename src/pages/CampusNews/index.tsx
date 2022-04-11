import { Button, Form, FormInstance, Image, Input, Select } from 'antd';
import React, { useRef, useState } from 'react';
import style from './index.module.less';
import Editor from 'ckeditor5-ehang-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
const { Option } = Select;

export default function CampusNews() {
  const formRef = useRef<FormInstance>(null);
  const [editorData, setEditorData] = useState<string>('');
  const [thumb, setThumb] = useState<string>('');
  const onClick = () => {
    if (formRef.current) {
      formRef.current.validateFields().then((values) => {
        const newData = {
          ...values,
          content: editorData,
        };
        download(`校园资讯-${newData.title}`, JSON.stringify(newData));
      });
    }
  };
  const download = (fileName: string, file: any) => {
    const a = document.createElement('a');
    let blob: any = new Blob([file], { type: 'text/json' });
    a.download = `${fileName}.json`;
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(blob);
  };
  const editorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(() => data);
  };
  const thumbChange = (event: any) => {
    const data = event.target.value;
    setThumb(() => data);
  };
  return (
    <div className={style.wrapper}>
      <h1>ehang miniprogram</h1>
      <h2>campus news template</h2>
      <div className={style.cnews}>
        <div className={style.thumb}>
          <Image className={style.thumb_box} src={thumb} />
        </div>
        <div className={style.form}>
          <Form
            ref={formRef}
            size='large'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label='标题'
              name='title'
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <Input placeholder='请输入标题' />
            </Form.Item>
            <Form.Item
              label='缩略图'
              name='thumb'
              rules={[{ required: true, message: 'Please input your thumb!' }]}
            >
              <Input placeholder='请输入缩略图' onChange={thumbChange} />
            </Form.Item>
            <Form.Item
              label='简介'
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Please input your description!',
                },
              ]}
            >
              <Input placeholder='请输入简介' />
            </Form.Item>
            <Form.Item
              label='标签'
              name='tags'
              rules={[
                {
                  required: true,
                  message: 'Please input your tags!',
                },
              ]}
            >
              <Input placeholder='请输入标签 (如: 易航工作室,中国民航大学,CAUC)' />
            </Form.Item>
            <Form.Item
              label='类型'
              name='content_type'
              rules={[
                {
                  required: true,
                  message: 'Please input your content_type!',
                },
              ]}
            >
              <Select>
                <Option value={1} key={1}>
                  校园资讯
                </Option>
                <Option value={2} key={2}>
                  广告
                </Option>
                <Option value={3} key={3}>
                  未定义
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              label='内容'
              name='content'
              rules={[
                {
                  required: true,
                  message: 'Please input your content!',
                },
              ]}
            >
              <CKEditor
                editor={Editor}
                data={editorData}
                onChange={editorChange}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Button type='primary' onClick={onClick}>
                下载
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <footer>
        <div className={style.footer}>
          <div>Make by John</div>
          <div>@CAUC</div>
        </div>
      </footer>
    </div>
  );
}
