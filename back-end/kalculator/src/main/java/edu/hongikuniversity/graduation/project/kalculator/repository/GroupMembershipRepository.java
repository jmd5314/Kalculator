package edu.hongikuniversity.graduation.project.kalculator.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupMembershipRepository extends JpaRepository<GroupMembership,Long> {
}
