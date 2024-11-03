package edu.hongikuniversity.graduation.project.kalculator.global.config;

import edu.hongikuniversity.graduation.project.kalculator.domain.battle.service.BattleGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class SchedulerConfig {
    private final BattleGroupService battleGroupService;
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void scheduleTaskUsingCronExpression() {
        battleGroupService.updateGroupStatuses();
    }
}
