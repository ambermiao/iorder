<template>
    <div class="member">
        <section class="content bg-secondary py-4">
            <div class="container">
                <div class="row">
                    <div class="col col-lg-3">
                        <div class="card shadow-sm">
                            <ul class="list-group">
                                <router-link to="/member/info"><li class="list-group-item rounded-0">個人檔案</li></router-link>
                                <router-link to="/member/orderlist"><li class="list-group-item rounded-0">我的訂單</li></router-link>
                            </ul>
                        </div>
                    </div>
                    <div class="col col-lg-9">
                        <div class="card p-4 shadow-sm">
                            
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    
</script>