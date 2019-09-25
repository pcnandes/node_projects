package br.com.condominio.condominio.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import br.com.condominio.condominio.domain.Condominio;

@Transactional
public interface CondominioRepository extends CrudRepository<Condominio, Long> {

}
