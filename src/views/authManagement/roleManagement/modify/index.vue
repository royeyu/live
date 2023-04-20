<template>
  <div>
    <customer-form status-text="修改" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { roleGet, roleUpdate } from '@/api/system'
  import { data } from '@/mixns/data'
  export default {
    mixins: [data],
    components: {
      customerForm
    },
    mounted() {
      this.roleGetData()
    },
    methods: {
      roleGetData() {
        roleGet({id: this.$route.query.id}).then(res => {
          let data = res.data
          data.resIds = data.resIds.split(',')
          // 获取菜单树
          this.$refs.form.getMenuTreeListData().then(res => {
            let treeData = res
            let newArr = []
            if (data.resIds) {
              data.resIds.map((item,index) => {
                treeData.map(item2 => {
                  // if (item === item2.id) {
                  if (item2.children == null) {
                    newArr.push(item2.id)
                  } else {
                    item2.children.map(child1 => {
                      if (child1.children == null) {
                        if (item === child1.id) {
                          newArr.push(child1.id)
                        }
                      } else {
                        child1.children.map(child2 => {
                          if (child2.children == null) {
                            if (item === child2.id) {
                              newArr.push(child2.id)
                            }
                          } else {
                            child2.children.map(child3 => {
                              if (child3.children == null) {
                                if (item === child3.id) {
                                  newArr.push(child3.id)
                                }
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                  // }
                })
              })
            }
            this.$refs.form.customerForm = {
              description: data.description,
              id: data.id,
              resIds: newArr,
              roleName: data.roleName,
            }
            console.log(this.$refs.form.customerForm )
          })

          // console.log(data.resIds)
        })
      },
      // 获取修改数据
      subData(data) {
        let params = { ...data }
        params.resIds = params.resIds.join(',')
        console.log(data)
        roleUpdate(params).then(res => {
          this.$message.success('操作成功！')
          this.subloading = false
          this.goReturn()
        })
      }
    }
  }
</script>

<style scoped>

</style>
