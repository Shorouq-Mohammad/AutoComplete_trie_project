class AutoCompleteTrie{
    constructor(value = ''){
        this.value = value
        this.children = {}
        this.endOfWord = false
    }
    addWord(word){
        let tempNode = this
        for(let i = 0; i< word.length; i++){
            const charI = word.charAt(i)
            if(!(tempNode.children[charI])){
                tempNode.children[charI] = new AutoCompleteTrie(charI)
            }
            tempNode = tempNode.children[charI]
            if(i === word.length - 1){
                tempNode.endOfWord = true
            }
        }
    }
    findWord(word){
        let tempNode = this
        for(let i = 0; i< word.length; i++){
            const charI = word.charAt(i)
            if(!(tempNode.children[charI])){
                return false
            }
            tempNode = tempNode.children[charI]
        }
        return true
    }
    predictWord(word){
        if(this.findWord(word)){
            return this._allWordsHelper(word, this._getRemainingTree(word))
        }else{
            return []
        }
    }
    _getRemainingTree(word, node = this.children[word.charAt(0)]){
        if(word.length === 1 ){
            return node
        }else if(node.value === word.charAt(0)){
            word = word.substring(1)
            if(node.children[word.charAt(0)]){
                return this._getRemainingTree(word, node.children[word.charAt(0)])
            }else{
                return false
            }
        }
    }
    _allWordsHelper(prefix, node, allWords = []){
        if(node.endOfWord){
            allWords.push(prefix)
        }
        const keys = Object.keys(node.children)
        if(keys.length !== 0){
            let tempNode = node.children
            for(let key of keys){
                let temp = prefix + tempNode[key].value
                this._allWordsHelper(temp, tempNode[key], allWords)
            }
            return allWords   
        }
    }
}