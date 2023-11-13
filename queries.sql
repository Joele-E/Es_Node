SELECT * FROM titanic WHERE survived=1 AND sex='female' AND age>30 ;

/*====================================================================*/
SELECT AVG(age) FROM titanic WHERE survived=0 AND sex='male';

/*====================================================================*/

SELECT * FROM titanic WHERE fare BETWEEN 20 AND 50 AND embarked='C';

/*====================================================================*/

SELECT COUNT(*) FROM titanic WHERE pclass=1 AND survived=1;

/*====================================================================*/

SELECT * FROM titanic WHERE embarked='C' AND fare>75;
