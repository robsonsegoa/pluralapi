var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	app = express();
	Times = require('./models/times');

//Conexão com o mongoDB
mongoose.connect('mongodb://localhost/pluralapi', function(err){
	if(err){
		conso.log('Erro ao conectar no mongodb: ' + err);
	}
});

app.use(bodyParser());

var port = process.env.PORT || 3000;

//Rotas 
var router = express.Router();

router.get('/',function(req,res){
	res.json({message: 'API Plural'});
});

router.route('/times')
	.get(function(req,res){
		Times.find(function(err,dados){
			if(err){
				res.send(err);
			}
			res.json(dados);
		});
	})
	.post(function(req,res){
		var times = new Times();
		times.nome = req.body.nome;
		times.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message: "Time cadastrado com sucesso"});
		})
	});


router.route('/times/:id')
	.get(function(req,res){
		Times.findById(req.params.id, function(err,dados){
			if(err){
				res.send(err);
			}
			res.json(dados);
		});
	})
	.put(function(req,res){
		Times.findById(req.params.id, function(err,dados){
			if(err){
				res.send(err);
			}

			dados.nome = req.body.nome;
			dados.save(function(err){
				if(err){
					res.send(err);
				}
				res.json({message: 'Time atualizado com sucesso!'});
			});
		});
	})

	.delete(function(req,res){
		Times.remove({_id: req.params.id}, function(err,dados){
			if(err){
				res.send(err)
			}
			res.json({message: 'Time excluido'});
		});
	})
	// Esse modelo abaixo eh outro modo de deletar com
	//parametrizações além do id
/*	.delete(function(req,res){
		Times.findById(req.params.id, function(err,dados){
			if(err){
				res.send(err);
			}

			//dados.nome = req.body.nome;
			dados.remove(function(err){
				if(err){
					res.send(err);
				}
				res.json({message: 'Time Removido'});
			});
		});
	})*/
app.use('/api',router);

app.listen(port,function(){
		console.log('Servidor rodando na porta' + port)
	});
