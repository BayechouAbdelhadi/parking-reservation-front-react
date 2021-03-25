class Tache():
    def __init__(self,uid,r,c,d):
        self.uid=uid
        self.r=r
        self.c=c
        self.d=d
        self.successeurs=[]
        self.predecsseurs=[]
        self.re=reself.de=def

    def appendSucc(self,t)
        self.successeurs.append(t)
        t.appendpred(self)
        
    def appendpred(self,t)
        self.predecsseurs.append(t)

if __name__=="__main__":
    A=Tache("A",r=0,c=2,d=13)
    B=Tache("A",r=1,c=3,d=15)
    C=Tache("A",r=12,c=3,d=25)
    D=Tache("A",r=0,c=5,d=9)
    E=Tache("A",r=10,c=1,d=17)
    F=Tache("A",r=0,c=2,d=13)
    F=Tache("G",r=0,c=5,d=2)
    #definition des contraintes de successions
    A.appendSucc(C)
    B.appendSucc(C)
    B.appendSucc(D)
    C.appendSucc(E)
    C.appendSucc(F)
    D.appendSucc(F)
    D.appendSucc(G)

    lt=[A,B,C,D,E,F,G]

    ## calcul de reveil 
    while(sum([t.re!=None for t in LT]))!=len(LT):
        TC=LT.pop(0)
        if(TC.re=None):
            if(len(TC.predecsseurs)==0)
                TC.re=TC.r
            else:
                if sum([t.re!=None for t in TC.predecesseurs])==len(TC.predecesseurs):
                    TC.re=max([TC.re]+[t.re+t.c for t in TC.predecesseurs])
            LT.append(TC)
    ## calcul de l'echéance
    while(sum([t.de!=None for t in LT]))!=len(LT):
        TC=LT.pop(0)
        if(TC.de=None):
            if(len(TC.successeurs)==0)
                TC.de=TC.d
            else:
                if sum([t.de!=None for t in TC.successeurs])==len(TC.successeurs):
                    TC.re=min([TC.de]+[t.de-t.c for t in TC.successeurs])
            LT.append(TC)
    

