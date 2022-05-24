import React, {ReactNode} from 'react'
import {Button, Divider, Form, Input, message, Modal, Space, Tree} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import './index.less'
import _ from 'lodash'

const {TreeNode} = Tree

const dt = [
    {
        title: '',
        field: 'creature',
        key: '0',
        children: [
            {
                title: '',
                field: 'animals',
                key: '0-0',
                children: [
                    {
                        title: '',
                        field: 'dog',
                        key: '0-0-0',
                    },
                    {
                        title: '',
                        field: 'cat',
                        key: '0-0-1',
                    },
                    {
                        title: '',
                        field: 'rabbit',
                        key: '0-0-2',
                    },
                ],
            },
            {
                title: '',
                field: 'plants',
                key: '0-1',
                children: [
                    {
                        title: '',
                        field: 'apple',
                        key: '0-1-0',
                    },
                ],
            },
            {
                title: '',
                field: 'microorganism',
                key: '0-2',
                children: [
                    {
                        title: '',
                        field: 'covid',
                        key: '0-2-0',
                    },
                    {
                        title: '',
                        field: 'variola',
                        key: '0-2-1',
                    },
                ],
            },
        ],
    },
]

namespace EditableTree {
    export interface Props{
        data:any[]
        setData: Function
    }
    export interface State{
        curSelectKey: string
        //data: any[]
        modalVisible: boolean
        modalTitle: string
        modalType?: string
        inputField: string
        //inputValue: string
    }
}

export interface TreeModal {
    visible: boolean
    title: string
    type:'brother' | 'child' | 'edit' | 'delete' | undefined
}

export interface TreeNodeItem {
    title: ReactNode | string
    key: string
    field: string
    //value: string
    children?: TreeNodeItem[]
}

const initialState = {
    curSelectKey:'',
    modalVisible: false,
    modalTitle:'',
    modalType:'',
    inputField: '',
    //inputValue: '',
}

class EditableTree extends React.Component<EditableTree.Props, EditableTree.State> {
    constructor(props:any) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    //solve tree select callback
    handleSelect = (curKeyList:any[]) =>{
        console.log("curKeyList",curKeyList)
        this.setState({
            curSelectKey: curKeyList[0]
        })
    }

    //control modal visible
    handleModalAction = (param:TreeModal) =>{
        const {curSelectKey} = this.state;
        if(!curSelectKey){
            message.error('check one item first please!')
            return
        }
        this.setState({
            modalVisible: param.visible,
            modalTitle: param.title,
            modalType: param.type
        })
    }

    //click addBrother btn
    onAddBrotherBtn = () =>{
        this.handleModalAction({
            visible: true,
            title: 'Add Brother',
            type: 'brother'
        })
    }

    //add brother function
    addBrotherFunc = (key:string, list:any[]=[], inputField:string='') =>{
        for(let i = 0; i < list.length; i++){
            if(key === list[i]['key']){
                list.push({
                    title: '',
                    key: `${key.split('-').slice(0,-1).join('-')}-${list.length}`,
                    field: inputField.trim()
                })
                break
            }else{
                if(list[i]['children'] && list[i]["children"]?.length){
                    this.addBrotherFunc(key, list[i]['children'], inputField)
                }
            }
        }
    }

    //click addChild btn
    onAddChildBtn = () =>{
        this.handleModalAction({
            visible: true,
            title: 'Add Child',
            type: 'child'
        })
    }

    //add child function
    addChildFunc = (key:string, list:any[]=[], inputField:string='') =>{
        for(let i = 0; i < list.length; i++){
            if(key === list[i]['key']){
                let childrenList = list[i]['children'];
                if(childrenList && childrenList.length > 0){
                    childrenList.push({
                        title: '',
                        key: `${key}-${list.length}`,
                        field: inputField.trim()
                    })
                }else{
                    list[i]['children'] = [{
                        title: '',
                        key: `${key}-0`,
                        field: inputField.trim()
                    }]
                }
                break
            }else{
                if(list[i]['children'] && list[i]["children"]?.length){
                    this.addChildFunc(key, list[i]['children'], inputField)
                }
            }
        }
    }

    //click Edit btn
    onEditBtn = () =>{
        const {data} = this.props
        const {curSelectKey} = this.state
        this.handleModalAction({
            visible: true,
            title: 'Edit',
            type: 'edit'
        })
        this.queryEditItem(curSelectKey, data)
    }

    //queryEditItem function
    queryEditItem = (key:string, list:any[]=[]) =>{
        for(let i = 0; i < list.length; i++){
            if(key === list[i]['key']){
                this.setState({
                    inputField: list[i]['field'].trim(),
                    //inputValue: list[i]['value']
                })
                break
            }else{
                if(list[i]['children'] && list[i]["children"]?.length){
                    this.queryEditItem(key, list[i]['children'])
                }
            }
        }
    }

    //edit Func
    onEditFunc = (key:string, list:any[]=[]) =>{
        for(let i = 0; i < list.length; i++){
            if(key === list[i]['key']){
                list[i]['field'] = this.state.inputField.trim();
                //list[i]['value'] = this.state.inputValue;
                break
            }else{
                if(list[i]['children'] && list[i]["children"]?.length){
                    this.onEditFunc(key, list[i]['children'])
                }
            }
        }
    }

    // click delete btn
    onDeleteBtn = () =>{
        this.handleModalAction({
            visible: true,
            title: 'Delete',
            type: 'delete'
        })
    }
    //click delete btn
    deleteFunc = (key:string,list:TreeNodeItem[]=[]) =>{
        for(let i = 0; i < list.length; i++){
            if(key === list[i]['key']){
                list.splice(i,1)
                break
            }else{
                if(list[i]['children'] && list[i]["children"]?.length){
                    this.deleteFunc(key, list[i]['children'])
                }
            }
        }

    }

    handleModalConfirm = () =>{
        const { data, setData} = this.props
        const {
            modalType, curSelectKey,
            inputField
        } = this.state;

        const copyData = _.cloneDeep(data)

        if(modalType === 'delete'){
            if(curSelectKey ==='0'){
                message.error(`no permission to delete the root node !`)
                return
            }
            this.deleteFunc(curSelectKey, copyData)
        }
        if(modalType === 'edit'){
            if(!inputField){
                message.error('input Field please !')
                return
            }
            this.onEditFunc(curSelectKey, copyData)
        }

        if(modalType === 'brother'){
            if(curSelectKey ==='0'){
                message.error(`no permission to delete the root node !`)
                return
            }
            if(!inputField){
                message.error('input Field please !')
                return
            }
            this.addBrotherFunc(curSelectKey, copyData, inputField)
        }

        if(modalType === 'child'){
            if(!inputField){
                message.error('input Field please !')
                return
            }
            this.addChildFunc(curSelectKey, copyData, inputField)
        }

        //console.log("copyData", copyData)

        this.setState({
            ...initialState,
        })

        setData(copyData)

    }

    handleInputChange = (field:string, value:string) => {
        this.setState({
            [field]: value
        }as any)
    }

    renderTreeNodes = (data:any[]) => data && data.length && data.map((item:TreeNodeItem)=>{
        item.title = <div className={"custom-block"}>
            <span className={"custom-title"}>{item.field}</span>
            {/*{item.value ? <span className={"custom-mao"}>:</span> : null}*/}
            {/*<span className={"custom-value"}>{item.value}</span>*/}
        </div>
        if (item.children && item.children.length) {
            return (
                <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} />
    });

    closeModal = () =>{
        this.setState({
            curSelectKey: '',
            modalVisible: false,
            modalTitle: '',
            modalType: ''
        })
    }

    render() {
        const {data} = this.props
        const {
            curSelectKey,
            modalVisible, modalTitle, modalType,
            inputField,
        } = this.state;
        console.log('this.state',this.state)
        return (
            <div className="editable-tree">
                {/*tree*/}
                <Tree
                    onSelect={this.handleSelect}
                    selectedKeys={[curSelectKey]}
                    showLine={{
                        showLeafIcon: false
                    }}
                    switcherIcon={<DownOutlined />}
                    defaultExpandAll

                >
                    {this.renderTreeNodes(data)}
                </Tree>
                <Divider/>
                {/*btn*/}
                <div className="et-btn-group">
                    <Space size={[8,16]} wrap>
                        <Button
                            disabled={!curSelectKey}
                            type={"default"}
                            onClick={this.onAddBrotherBtn}
                        >
                            Add Brother
                        </Button>
                        <Button
                            disabled={!curSelectKey}
                            type={"default"}
                            onClick={this.onAddChildBtn}
                        >
                            Add Child
                        </Button>
                        <Button
                            disabled={!curSelectKey}
                            type={"default"}
                            onClick={this.onEditBtn}
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={!curSelectKey}
                            type={"default"}
                            onClick={this.onDeleteBtn}
                        >
                            Delete
                        </Button>
                    </Space>
                </div>
                {/*modal*/}
                <Modal
                    visible={modalVisible}
                    title={modalTitle}
                    onCancel={this.closeModal}
                    onOk={this.handleModalConfirm}
                >
                    {modalType==='delete' &&
                        <p>Do you want to delete the current node and its child nodes ?</p>
                    }

                    {((modalType === 'edit') || (modalType === 'brother') || (modalType === 'child'))&&
                        <Form>
                            <Form.Item label="Field">
                                <Input
                                    placeholder="input field here~"
                                    value={inputField}
                                    onChange={(e)=> this.handleInputChange('inputField', e.target.value)}
                                />
                            </Form.Item>
                            {/*<Form.Item label="Value">*/}
                            {/*    <Input*/}
                            {/*        placeholder="input value here~"*/}
                            {/*        value={inputValue}*/}
                            {/*        onChange={(e)=> this.handleInputChange('inputValue', e.target.value)}*/}
                            {/*    />*/}
                            {/*</Form.Item>*/}
                        </Form>
                    }

                </Modal>

            </div>


        );
    }
}

export default EditableTree;

