
var vm = new Vue({
    el:"#app",
    data:{
        type:'X',
        flag:false,
        typeFlag:false,
        isComputer:false,
        arr:['','','','','','','','',''],
        oneResult:false,
        twoResult:false,
        pageNum:'A',
        msg:'请选择游戏类型',
        text1:'单人',
        text2:'2人',
    },
    methods:{
        set(index){
            this.$refs.temp[index].option(index);
            this.checkIndex(this.arr);

            if(this.checkIndex(this.arr) == true){
                if(this.oneResult == true && this.isComputer == true && this.type == 'X' ||
                 this.twoResult == true && this.isComputer == true && this.type == 'O'){
                    this.msg = '赢了✌️';
                }
                else if(this.isComputer == true){
                    this.msg = '真棒👍️';
                }
                this.pageNum = 'C';
            }
            else{

                let newArr = [];
                for(let i=0;i<this.arr.length;i++){
                    if(this.arr[i] == ''){
                         newArr.push(i);
                    }
                }
                if(newArr.length == 0){
                    this.msg = '真遗憾💦';
                    this.pageNum = 'C';
                }
                if(this.isComputer == true){
                    let newNum = newArr[Math.floor(Math.random()*newArr.length)];
                    let that = this;
                    setTimeout(function(){
                        that.$refs.temp[newNum].option(newNum);
                    },600);

                }
            }


        },
        checkIndex(num){
            let arr = [];
            let row = [];
            let col = [];
            let box = [];
            for(let i=0;i<3;i++){
                row[i] = new Map();
                col[i] = new Map();
                box[i] = new Map();
                arr[i] = [];
            }
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    arr[i].push(num[i*3+j]);
                }
            }
            for(let i=0;i<arr.length;i++){
                for(let j=0;j<arr[i].length;j++){
                    if(arr[i][j] == 'X' || arr[i][j] == 'O'){
                        row[i].set(arr[i][j],!row[i].get(arr[i][j])?1:row[i].get(arr[i][j])+1);
                        col[j].set(arr[i][j],!col[j].get(arr[i][j])?1:col[j].get(arr[i][j])+1);
                        if(i+j == 2){
                           box[0].set(arr[i][j],!box[0].get(arr[i][j])?1:box[0].get(arr[i][j])+1);
                        }
                        if(i-j == 0){
                           box[1].set(arr[i][j],!box[1].get(arr[i][j])?1:box[1].get(arr[i][j])+1);
                        }
                        if(row[i].get(arr[i][j]) == 3 || box[0].get(arr[i][j]) == 3 || box[1].get(arr[i][j]) == 3 || col[j].get(arr[i][j]) == 3){
                            if( arr[i][j] == 'X'){
                                this.oneResult = true;
                                return true;
                            }else{
                                this.twoResult = true;
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        },
        reset(){
            this.type = 'X';
            this.flag = false;
            this.typeFlag = false;
            this.isComputer = false;
            this.oneResult = false;
            this.twoResult = false;
            this.arr=['','','','','','','','',''];
            this.msg = '请选择游戏类型';
            this.text1 = '单人';
            this.text2 = '2人';
            this.pageNum = 'A';

        },
        reStart(){
            this.oneResult = false;
            this.twoResult = false;
            this.arr=['','','','','','','','',''];
            this.pageNum = 'B';
            if(this.isComputer == false ){
                this.flag = false;
            }
            else{
                if(this.type == 'O'){
                    this.flag = true;
                    let that = this;
                    setTimeout(function(){
                    that.$refs.temp[4].option(5);
                    },600);
                }
            }
        },
        typeStart(num){
            if(num == 1 && this.text1 != 'X'){
                this.isComputer = true;
                this.msg = '请选择角色';
                this.text1 = 'X';
                this.text2 = 'O';
            }
            else if(num == 1 && this.text1 == 'X'){
                this.type = 'X';
                this.flag = false;
                this.pageNum = 'B';
            }
            else if(num == 2 && this.text2 == 'O'){
                this.type = 'O';
                this.flag = true;
                this.pageNum = 'B';
                let that = this;
                setTimeout(function(){
                    that.$refs.temp[4].option(5);
                },600);
            }
            else{
                this.isComputer = false;
                this.pageNum = 'B';
            }

        },
    },
    components:{
        but:{
            template:"<button :disabled='this.disable' :id='this.index'>{{this.text}}</button>",
            data(){
                return{
                   text:'',
                   disable:false,
                }
            },
            methods:{
                option(index){
                    if(this.$root.typeFlag == false){
                        this.$root.typeFlag=!this.$root.typeFlag;
                        this.text='X';
                    }
                    else{
                        this.$root.typeFlag=!this.$root.typeFlag;
                        this.text='O';
                    }
                    this.$root.flag = !this.$root.flag;
                    this.$root.arr[index] = this.text;
                    this.disable = true;
                }
            },
        },
    }
});